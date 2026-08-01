import { useEffect, useRef, useState } from "react";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    MeshBasicMaterial,
    Color,
    Mesh,
    Group,
    InstancedMesh,
    Matrix4,
    Raycaster,
    Vector2,
    TubeGeometry,
    CatmullRomCurve3,
    Vector3,
    CanvasTexture,
} from "three";
import { geoEquirectangular, geoPath } from "d3-geo";

function parseColorToRgba(input) {
    if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
    const str = input.trim();
    const rgbaMatch = str.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
    );
    if (rgbaMatch) {
        const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
        const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
        const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
        const a =
            rgbaMatch[4] !== undefined
                ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
                : 1;
        return { r, g, b, a };
    }
    const hex = str.replace(/^#/, "");
    if (hex.length === 8) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: parseInt(hex.slice(6, 8), 16) / 255,
        };
    }
    if (hex.length === 6) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: 1,
        };
    }
    if (hex.length === 4) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: parseInt(hex[3] + hex[3], 16) / 255,
        };
    }
    if (hex.length === 3) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: 1,
        };
    }
    return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(value, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMin;
    const t = (value - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
}

function mapSpeedUiToInternal(ui) {
    if (ui === 0) return 0;
    const clamped = Math.max(0, Math.min(10, ui));
    return mapLinear(clamped, 0, 10, 0, 0.9);
}
function mapDensityUiToSpacing(ui) {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 24, 8);
}
function mapScaleUiToMultiplier(ui) {
    const clamped = Math.max(1, Math.min(20, ui));
    return mapLinear(clamped, 1, 20, 0.2, 2);
}
function mapDotSizeUiToMultiplier(ui) {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 0.1, 0.5);
}
function mapMarkerDotSizeUiToMultiplier(ui) {
    const clamped = Math.max(0, Math.min(100, ui));
    return mapLinear(clamped, 0, 100, 0.1, 2.5);
}
function normalizeSmoothing(ui) {
    return Math.max(0, Math.min(1, ui / 10));
}
function mapDragSpeedUiToSensitivity(ui) {
    return mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02);
}
function mapDetailToStepSize(ui) {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 10, 1);
}

function simplifyRing(ring, detail) {
    if (ring.length < 2) return ring;
    if (detail >= 10) return ring;
    const stepSize = Math.max(1, Math.floor(mapDetailToStepSize(detail)));
    const simplified = [];
    simplified.push(ring[0]);
    for (let i = stepSize; i < ring.length - 1; i += stepSize) {
        const idx = Math.min(i, ring.length - 1);
        simplified.push(ring[idx]);
    }
    const lastPoint = ring[ring.length - 1];
    const firstPoint = ring[0];
    const isClosed =
        Math.abs(lastPoint[0] - firstPoint[0]) < 1e-4 &&
        Math.abs(lastPoint[1] - firstPoint[1]) < 1e-4;
    if (!isClosed) {
        simplified.push(lastPoint);
    }
    return simplified.length >= 2 ? simplified : ring;
}

function latLngToPosition(lat, lng) {
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);
    const x = Math.cos(latRad) * Math.sin(lngRad);
    const y = Math.sin(latRad);
    const z = Math.cos(latRad) * Math.cos(lngRad);
    return { x, y, z };
}

export default function Globe({
    speed = 2,
    smoothing = 8,
    dots = { color: "#6FC3DF", size: 5, density: 8, allDots: false },
    fill = "dots",
    fillColor = "#6FC3DF",
    scale = 8,
    stopOnHover = true,
    markerConfig = { markers: [], color: "#38BDF8", size: 40 },
    direction = "left",
    initialLatitude = 23,
    initialLongitude = -23,
    oceanColor = "#02070D",
    outlineColor = "#6FC3DF",
    showOutline = true,
    graticuleColor = "rgba(111,195,223,0.15)",
    showGrid = true,
    outlineWidth = 1,
    dragSpeed = 5,
    detail = 5,
    style,
}) {
    const containerRef = useRef(null);
    const [, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const dotColor = dots.color;
    const dotSize = dots.size;
    const density = dots.density;
    const allDots = dots.allDots;
    const gridWidth = 1;
    const smoothingN = normalizeSmoothing(smoothing);
    const baseRotationSpeed = mapSpeedUiToInternal(speed);
    const rotationSpeed = direction === "left" ? -baseRotationSpeed : baseRotationSpeed;
    const dotSpacing = mapDensityUiToSpacing(density);
    const dotSizeMultiplier = mapDotSizeUiToMultiplier(dotSize);
    const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(markerConfig.size);
    const scaleMultiplier = mapScaleUiToMultiplier(scale);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const containerWidth = container.clientWidth || container.offsetWidth || 800;
        const containerHeight = container.clientHeight || container.offsetHeight || 600;

        const scene = new Scene();
        const camera = new PerspectiveCamera(50, containerWidth / containerHeight, 0.1, 1e3);
        const baseRadius = 1;
        const globeRadius = baseRadius * scaleMultiplier;
        const cameraDistance = 2.5 / scaleMultiplier;
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);

        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = "srgb";
        const canvas = renderer.domElement;
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        canvas.style.opacity = "0";
        canvas.style.visibility = "hidden";
        container.appendChild(canvas);

        const resolvedOceanColor = oceanColor;
        const resolvedOutlineColor = outlineColor;
        const resolvedDotColor = dotColor;
        const resolvedMarkerColor = markerConfig.color;
        const resolvedGraticuleColor = graticuleColor;
        const resolvedFillColor = fillColor;
        const oceanRgba = parseColorToRgba(resolvedOceanColor);
        const outlineRgba = parseColorToRgba(resolvedOutlineColor);
        const dotRgba = parseColorToRgba(resolvedDotColor);
        const graticuleRgba = parseColorToRgba(resolvedGraticuleColor);
        const fillRgba = parseColorToRgba(resolvedFillColor);

        const oceanGeometry = new SphereGeometry(globeRadius, 64, 64);
        const oceanColorObj = resolvedOceanColor ? new Color(resolvedOceanColor) : new Color(0, 0, 0);
        const oceanMaterial = new MeshBasicMaterial({
            color: oceanColorObj,
            transparent: oceanRgba.a < 1 || oceanRgba.a === 0,
            opacity: oceanRgba.a,
        });
        const oceanMesh = new Mesh(oceanGeometry, oceanMaterial);
        scene.add(oceanMesh);

        const continentOutlineGroup = new Group();
        const graticuleGroup = new Group();

        if (showGrid && resolvedGraticuleColor && graticuleRgba.a > 0) {
            const graticuleColorObj = new Color(resolvedGraticuleColor);
            const graticuleMaterial = new MeshBasicMaterial({
                color: graticuleColorObj,
                transparent: graticuleRgba.a < 1,
                opacity: graticuleRgba.a,
            });
            const gridSpacing = 15;
            for (let lat = -90; lat <= 90; lat += gridSpacing) {
                const positions = [];
                const segments = 64;
                for (let i = 0; i <= segments; i++) {
                    const lng = (i / segments) * 360 - 180;
                    const pos = latLngToPosition(lat, lng);
                    positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
                }
                if (positions.length >= 6) {
                    const points = [];
                    for (let i = 0; i < positions.length; i += 3) {
                        points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
                    }
                    if (points.length >= 2) {
                        const curve = new CatmullRomCurve3(points);
                        const tubeGeometry = new TubeGeometry(curve, points.length * 2, (gridWidth / 10) * 0.01, 8, false);
                        const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial);
                        graticuleGroup.add(tubeMesh);
                    }
                }
            }
            for (let lng = -180; lng < 180; lng += gridSpacing) {
                const positions = [];
                const segments = 64;
                for (let i = 0; i <= segments; i++) {
                    const lat = (i / segments) * 180 - 90;
                    const pos = latLngToPosition(lat, lng);
                    positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
                }
                if (positions.length >= 6) {
                    const points = [];
                    for (let i = 0; i < positions.length; i += 3) {
                        points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
                    }
                    if (points.length >= 2) {
                        const curve = new CatmullRomCurve3(points);
                        const tubeGeometry = new TubeGeometry(curve, points.length * 2, (gridWidth / 10) * 0.01, 8, false);
                        const tubeMesh = new Mesh(tubeGeometry, graticuleMaterial);
                        graticuleGroup.add(tubeMesh);
                    }
                }
            }
        }

        let dotInstances = null;
        let markerMeshes = [];

        const initialLongitudeRad = (initialLongitude * Math.PI) / 180;
        const initialLatitudeRad = (initialLatitude * Math.PI) / 180;
        const rotation = { x: initialLongitudeRad, y: initialLatitudeRad };
        const targetRotation = { x: initialLongitudeRad, y: initialLatitudeRad };
        const velocity = { x: 0, y: 0 };
        let isDragging = false;
        let isHovering = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let animationFrameId = null;
        const lerpFactor = smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
        const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

        const globeGroup = new Group();
        globeGroup.rotation.y = initialLongitudeRad;
        globeGroup.rotation.x = initialLatitudeRad;
        scene.add(globeGroup);
        globeGroup.add(oceanMesh);
        if (showGrid && graticuleColor && graticuleRgba.a > 0) {
            globeGroup.add(graticuleGroup);
        }
        globeGroup.add(continentOutlineGroup);

        const loadWorldData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json"
                );
                if (!response.ok) throw new Error("Failed to load land data");
                const landFeatures = await response.json();

                while (continentOutlineGroup.children.length > 0) {
                    continentOutlineGroup.remove(continentOutlineGroup.children[0]);
                }

                if (showOutline && outlineColor && outlineRgba.a > 0) {
                    const outlineColorObj = new Color(resolvedOutlineColor);
                    const outlineMaterial = new MeshBasicMaterial({
                        color: outlineColorObj,
                        transparent: outlineRgba.a < 1,
                        opacity: outlineRgba.a,
                        depthTest: true,
                        depthWrite: true,
                    });
                    const projection = geoEquirectangular();
                    const pathGenerator = geoPath().projection(projection);

                    landFeatures.features.forEach((feature) => {
                        const featureType = feature.properties?.featurecla || "";
                        const featureName = feature.properties?.name || "";
                        if (
                            featureType.toLowerCase().includes("graticule") ||
                            featureName.toLowerCase().includes("grid")
                        ) return;

                        const pathString = pathGenerator(feature);
                        if (!pathString) return;

                        const geometry = feature.geometry;
                        if (!geometry || !geometry.coordinates) return;

                        const processRing = (ring) => {
                            if (ring.length < 2) return;
                            const simplifiedRing = simplifyRing(ring, detail);
                            const positions = [];
                            simplifiedRing.forEach((coord) => {
                                const [lng, lat] = coord;
                                const pos = latLngToPosition(lat, lng);
                                positions.push(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
                            });
                            if (positions.length >= 6) {
                                const points = [];
                                for (let i = 0; i < positions.length; i += 3) {
                                    points.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
                                }
                                if (points.length > 0 && points[0].distanceTo(points[points.length - 1]) > 0.001) {
                                    points.push(points[0].clone());
                                }
                                if (points.length >= 2) {
                                    const curve = new CatmullRomCurve3(points);
                                    const tubeGeometry = new TubeGeometry(curve, points.length * 2, (outlineWidth / 10) * 0.01, 8, false);
                                    const tubeMesh = new Mesh(tubeGeometry, outlineMaterial);
                                    continentOutlineGroup.add(tubeMesh);
                                }
                            }
                        };

                        if (geometry.type === "Polygon" && geometry.coordinates.length > 0) {
                            processRing(geometry.coordinates[0]);
                        } else if (geometry.type === "MultiPolygon") {
                            geometry.coordinates.forEach((polygon) => {
                                if (polygon.length > 0) processRing(polygon[0]);
                            });
                        }
                    });
                }

                // Bitmap for land detection
                const bitmapWidth = 2048;
                const bitmapHeight = 1024;
                const offscreenCanvas = document.createElement("canvas");
                offscreenCanvas.width = bitmapWidth;
                offscreenCanvas.height = bitmapHeight;
                const ctx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) throw new Error("Canvas not supported");
                const projection = geoEquirectangular().fitSize([bitmapWidth, bitmapHeight], { type: "Sphere" });
                const pathGenerator = geoPath().projection(projection).context(ctx);
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                landFeatures.features.forEach((feature) => pathGenerator(feature));
                ctx.fill();
                const imageData = ctx.getImageData(0, 0, bitmapWidth, bitmapHeight);
                const pixels = imageData.data;
                const isOnLand = (lng, lat) => {
                    const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth;
                    const y = Math.round(((90 - lat) / 180) * bitmapHeight);
                    const clampedY = Math.max(0, Math.min(bitmapHeight - 1, y));
                    const idx = (clampedY * bitmapWidth + x) * 4;
                    return pixels[idx] > 128;
                };

                // Generate dots
                const dotCoordinates = [];
                const baseStep = dotSpacing * 0.08;
                for (let lat = -90; lat <= 90; lat += baseStep) {
                    const latRad = (Math.abs(lat) * Math.PI) / 180;
                    const cosLat = Math.cos(latRad);
                    const lngStep = cosLat > 0.01 ? baseStep / Math.max(0.3, cosLat) : 360;
                    for (let lng = -180; lng < 180; lng += lngStep) {
                        if (allDots || isOnLand(lng, lat)) {
                            dotCoordinates.push([lng, lat]);
                        }
                    }
                }

                if (dotCoordinates.length > 0) {
                    const dotGeometry = new SphereGeometry(0.01 * dotSizeMultiplier, 4, 4);
                    const dotColorObj = resolvedDotColor ? new Color(resolvedDotColor) : new Color(0.6, 0.6, 0.6);
                    const dotMaterial = new MeshBasicMaterial({
                        color: dotColorObj,
                        transparent: dotRgba.a < 1,
                        opacity: dotRgba.a,
                    });
                    const instanced = new InstancedMesh(dotGeometry, dotMaterial, dotCoordinates.length);
                    const matrix = new Matrix4();
                    for (let i = 0; i < dotCoordinates.length; i++) {
                        const [lng, lat] = dotCoordinates[i];
                        const pos = latLngToPosition(lat, lng);
                        matrix.makeScale(1, 1, 1);
                        matrix.setPosition(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
                        instanced.setMatrixAt(i, matrix);
                    }
                    instanced.instanceMatrix.needsUpdate = true;
                    dotInstances = instanced;
                    globeGroup.add(dotInstances);
                }

                // Add markers
                updateMarkers();
                renderer.render(scene, camera);
                canvas.style.opacity = "1";
                canvas.style.visibility = "visible";
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load land map data");
                setIsLoading(false);
            }
        };

        const updateMarkers = () => {
            markerMeshes.forEach((mesh) => globeGroup.remove(mesh));
            markerMeshes = [];
            if (markerConfig.markers && markerConfig.markers.length > 0) {
                const markerSize = 0.01 * markerRadiusMultiplier;
                const markerGeometry = new SphereGeometry(markerSize, 16, 16);
                const markerColorObj = resolvedMarkerColor ? new Color(resolvedMarkerColor) : new Color(1, 1, 1);
                const markerMaterial = new MeshBasicMaterial({ color: markerColorObj });
                markerConfig.markers.forEach((marker) => {
                    if (!marker) return;
                    let lat, lng;
                    if (marker.location) {
                        lat = marker.location[0];
                        lng = marker.location[1];
                    } else if (typeof marker.lat === "number") {
                        lat = marker.lat;
                        lng = marker.lng;
                    } else return;
                    
                    const pos = latLngToPosition(lat, lng);
                    const markerMesh = new Mesh(markerGeometry, markerMaterial.clone());
                    markerMesh.position.set(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
                    globeGroup.add(markerMesh);
                    markerMeshes.push(markerMesh);
                });
            }
        };

        const animate = () => {
            let needsRender = false;
            const threshold = 0.01;
            if (!isDragging && rotationSpeed !== 0 && (!stopOnHover || !isHovering)) {
                targetRotation.x += rotationSpeed * 0.01;
            }
            if (!isDragging && smoothingN > 0) {
                if (Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold) {
                    targetRotation.x += velocity.x;
                    targetRotation.y += velocity.y;
                    targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
                    velocity.x *= velocityDecay;
                    velocity.y *= velocityDecay;
                } else {
                    velocity.x = 0;
                    velocity.y = 0;
                }
            }
            const dx = targetRotation.x - rotation.x;
            const dy = targetRotation.y - rotation.y;
            if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || rotationSpeed !== 0 || isDragging) {
                rotation.x += dx * lerpFactor;
                rotation.y += dy * lerpFactor;
                rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
                needsRender = true;
            }
            if (needsRender || rotationSpeed !== 0 || isDragging) {
                globeGroup.rotation.y = rotation.x;
                globeGroup.rotation.x = rotation.y;
                renderer.render(scene, camera);
            }
            const hasVelocity = Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold;
            const hasLerpDelta = Math.abs(dx) > threshold || Math.abs(dy) > threshold;
            if (isDragging || rotationSpeed !== 0 || hasVelocity || hasLerpDelta) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                animationFrameId = null;
            }
        };

        const startAnimation = () => {
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        if (rotationSpeed !== 0) startAnimation();

        const handleMouseDown = (event) => {
            isDragging = true;
            velocity.x = 0;
            velocity.y = 0;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            startAnimation();
            const handleMouseMoveDrag = (moveEvent) => {
                const sensitivity = mapDragSpeedUiToSensitivity(dragSpeed);
                const dx = moveEvent.clientX - lastMouseX;
                const dy = moveEvent.clientY - lastMouseY;
                targetRotation.x += dx * sensitivity;
                targetRotation.y += dy * sensitivity;
                targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
                velocity.x = dx * sensitivity * 0.3;
                velocity.y = dy * sensitivity * 0.3;
                lastMouseX = moveEvent.clientX;
                lastMouseY = moveEvent.clientY;
            };
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMoveDrag);
                document.removeEventListener("mouseup", handleMouseUp);
                isDragging = false;
            };
            document.addEventListener("mousemove", handleMouseMoveDrag);
            document.addEventListener("mouseup", handleMouseUp);
        };
        canvas.addEventListener("mousedown", handleMouseDown);

        const raycaster = new Raycaster();
        const mouse = new Vector2();
        const handleMouseMove = (event) => {
            if (!stopOnHover) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(oceanMesh);
            isHovering = intersects.length > 0;
        };
        canvas.addEventListener("mousemove", handleMouseMove);

        const resizeObserver = new ResizeObserver(() => {
            const newWidth = container.clientWidth || 800;
            const newHeight = container.clientHeight || 600;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            camera.position.set(0, 0, 2.5 / scaleMultiplier);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        });
        resizeObserver.observe(container);

        loadWorldData();

        return () => {
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            resizeObserver.disconnect();
            renderer.dispose();
            container.removeChild(canvas);
        };
    }, [
        speed, smoothing, dots, fill, fillColor, allDots, density, dotSize,
        dotColor, scale, stopOnHover, markerConfig, direction, initialLatitude,
        initialLongitude, oceanColor, outlineColor, showOutline, graticuleColor,
        showGrid, outlineWidth, dragSpeed, detail, rotationSpeed, dotSpacing,
        dotSizeMultiplier, markerRadiusMultiplier, scaleMultiplier,
    ]);

    const containerStyle = {
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    if (error) {
        return (
            <div style={containerStyle}>
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", color: "#fff", textAlign: "center", padding: "16px",
                }}>
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>Error loading globe</div>
                    <div style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>{error}</div>
                </div>
            </div>
        );
    }

    return <div ref={containerRef} style={containerStyle} />;
}