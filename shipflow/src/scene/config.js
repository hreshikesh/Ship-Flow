export const CONFIG = {
    DEBUG_ORBIT: false,
    DEBUG_THEATRE: false,

    ship: {
        url: "/models/cargo_ship_loaded.glb",
        targetLength: 13.8,
        extraScale: 1,
        heroPosition: [4.8, 0, 0],
        draft: 0.46,
        rotationY: Math.PI,
        useDraco: true,
        pitchStrength: 0.42,
        rollStrength: 0.5,
    },

    background: "#071A2F",

    camera: {
        fov: 31,
        base: [-14.2, 4.65, 24],
        lookAt: [4.1, 1.35, 0],
        parallax: [0.55, 0.2],
    },

    sun: {
        position: [900, 150, -900],
        direction: [0.7, 0.12, -0.7],
        color: "#FFD9A8",

        // no sprite now, kept only for compatibility
        spriteScale: 0,
        coreScale: 0,
        glowOpacity: 0,
    },

    env: {
        hdrUrl: "/hdr/sunrise.hdr",
        fallbackPreset: "sunset",
        intensity: 0.34,
        background: false,
        backgroundIntensity: 1,
        backgroundBlur: 0,
        rotationY: 0,
    },

    fog: {
        color: "#9fb3bf",
        density: 0.0035,
    },

    ocean: {
        size: 1500,
        segments: 170,
        amplitude: 0.72,
        colorDeep: "#05283c",
        colorMid: "#063b57",
        colorLight: "#2e6f83",
    },

    clouds: {
        radius: 850,
        coverage: 0.42,
        speed: 0.012,
    },

    arrival: {
        loaderEnd: 2.8,
    },

    responsive: {
        mobile: {
            breakpoint: 768,
            camera: {
                base: [-16, 5.4, 31],
                lookAt: [4.2, 1.25, 0],
                fov: 38,
            },
            ship: {
                targetLength: 11.5,
                heroPosition: [4.5, 0, 0],
            },
            ocean: {
                segments: 90,
                amplitude: 0.72,
            },
        },

        tablet: {
            breakpoint: 1024,
            camera: {
                base: [-15.5, 5.0, 28],
                lookAt: [4.2, 1.3, 0],
                fov: 35,
            },
            ship: {
                targetLength: 12.6,
                heroPosition: [4.6, 0, 0],
            },
            ocean: {
                segments: 130,
                amplitude: 0.82,
            },
        },

        desktop: {
            breakpoint: Infinity,
            camera: {
                base: [-14.2, 4.65, 24],
                lookAt: [4.1, 1.35, 0],
                fov: 31,
            },
            ship: {
                targetLength: 13.8,
                heroPosition: [4.8, 0, 0],
            },
            ocean: {
                segments: 190,
                amplitude: 0.9,
            },
        },
    },
};

/**
 * Helper to fetch merged configurations based on screen width
 * @param {number} width - window.innerWidth
 */
export function getResponsiveConfig(width) {
    const { mobile, tablet, desktop } = CONFIG.responsive;

    let activeTier = desktop;
    if (width <= mobile.breakpoint) {
        activeTier = mobile;
    } else if (width <= tablet.breakpoint) {
        activeTier = tablet;
    }

    // Deep merge global config with active responsive tier overrides
    return {
        ...CONFIG,
        camera: { ...CONFIG.camera, ...activeTier.camera },
        ship: { ...CONFIG.ship, ...activeTier.ship },
        ocean: { ...CONFIG.ocean, ...activeTier.ocean },
    };
}