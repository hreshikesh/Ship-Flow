import { useEffect } from "react";

export default function SEO({
  title = "SandebTech Marine — CFD & CAE Engineering Solutions",
  description = "SandebTech Marine delivers maritime CFD simulation, SHIPFLOW and CAESES licensing, parametric hull design, shape optimization, and engineering consulting from Bangalore, India.",
  keywords = "SandebTech Marine, CFD simulation, SHIPFLOW, CAESES, hull optimization, maritime engineering",
  url = "https://sandebmarine.com",
  ogImage = "https://sandebmarine.com/og-image.jpg",
  ogType = "website",
  structuredData = null,
  noIndex = false,
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to create or update meta tags safely
    const setMeta = (attrName, attrValue, contentValue) => {
      if (!contentValue) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper to update link tags
    const setLink = (relValue, hrefValue) => {
      if (!hrefValue) return;
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        document.head.appendChild(element);
      }
      element.setAttribute("href", hrefValue);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setLink("canonical", url);

    // 3. Open Graph (Facebook / LinkedIn)
    setMeta("property", "og:site_name", "SandebTech Marine");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    // 4. Twitter Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 5. JSON-LD Structured Data
    let scriptElement = document.querySelector("script[id='json-ld-seo']");
    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = "json-ld-seo";
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, keywords, url, ogImage, ogType, structuredData, noIndex]);

  return null; // Renders nothing to the React DOM tree
}