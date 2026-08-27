const SITE_URL = "https://sandebmarine.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

const baseConfigs = {
  home: {
    title: "SandebTech Marine — CFD & CAE Engineering Solutions",
    description:
      "SandebTech Marine delivers maritime CFD simulation, SHIPFLOW and CAESES licensing, parametric hull design, shape optimization, and engineering consulting from Bangalore, India.",
    keywords:
      "SandebTech Marine, CFD simulation, SHIPFLOW, CAESES, hull optimization, maritime engineering, parametric CAD, Bangalore",
    url: `${SITE_URL}/`,
    ogImage: DEFAULT_OG,
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SandebTech Marine",
      legalName: "SANDEB TECH PVT LTD",
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      description:
        "SandebTech Marine specializes in CFD simulation, CAE software, and maritime design optimization as an authorized SHIPFLOW and CAESES partner.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "166, 5th Cross, KEB Layout, Sanjaynagar",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560094",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9108994209",
        contactType: "sales",
        email: "contact@sandebtech.com",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.sandebtech.com",
        "https://www.linkedin.com/company/sandebtech",
      ],
    },
  },

  shipflow: {
    title: "SHIPFLOW CFD Software | SandebTech Marine",
    description:
      "Complete SHIPFLOW CFD suite for ship hull design, resistance & propulsion, seakeeping, and free-surface flow analysis. Licensing, training, and consulting from SandebTech Marine.",
    keywords:
      "SHIPFLOW, CFD software, ship hull design, resistance prediction, seakeeping, XPAN, XCHAP, maritime CFD, SandebTech Marine",
    url: `${SITE_URL}/shipflow`,
    ogImage: DEFAULT_OG,
    ogType: "article",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SHIPFLOW",
      applicationCategory: "EngineeringApplication",
      operatingSystem: "Windows, Linux",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      author: {
        "@type": "Organization",
        name: "FLOWTECH International",
      },
      provider: {
        "@type": "Organization",
        name: "SandebTech Marine",
        url: SITE_URL,
      },
    },
  },

  caeses: {
    title: "CAESES — Parametric CAD & Shape Optimization | SandebTech Marine",
    description:
      "CAESES parametric modeling and simulation-driven shape optimization for hull forms, propellers, turbomachinery, and ducts. Authorized partner SandebTech Marine provides licensing and support.",
    keywords:
      "CAESES, parametric CAD, shape optimization, hull form design, propeller optimization, CFD automation, FRIENDSHIP SYSTEMS, SandebTech Marine",
    url: `${SITE_URL}/caeses`,
    ogImage: DEFAULT_OG,
    ogType: "article",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "CAESES",
      applicationCategory: "EngineeringApplication",
      operatingSystem: "Windows, Linux",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      author: {
        "@type": "Organization",
        name: "FRIENDSHIP SYSTEMS",
      },
      provider: {
        "@type": "Organization",
        name: "SandebTech Marine",
        url: SITE_URL,
      },
    },
  },

  tutorials: {
    title: "CFD & CAE Software Tutorials | SandebTech Marine",
    description:
      "Step-by-step tutorials and official documentation for SHIPFLOW and CAESES. Learn hull optimization, free-surface analysis, parametric modeling, and CFD automation with SandebTech Marine.",
    keywords:
      "SHIPFLOW tutorial, CAESES tutorial, CFD training, parametric modeling guide, hull optimization tutorial, SandebTech Marine",
    url: `${SITE_URL}/tutorials`,
    ogImage: DEFAULT_OG,
    ogType: "article",
  },

  contact: {
    title: "Contact SandebTech Marine — CFD & CAE Consulting",
    description:
      "Contact SandebTech Marine for SHIPFLOW and CAESES licensing, CFD consulting, training, and maritime engineering services. SANDEB TECH PVT LTD, Sanjaynagar, Bangalore.",
    keywords:
      "contact SandebTech Marine, CFD consulting Bangalore, SHIPFLOW license India, CAESES support, SANDEB TECH PVT LTD",
    url: `${SITE_URL}/contact`,
    ogImage: DEFAULT_OG,
    ogType: "website",
  },

  notfound: {
    title: "Page Not Found | SandebTech Marine",
    description:
      "The page you are looking for does not exist. Return to SandebTech Marine for CFD and CAE engineering solutions.",
    keywords: "",
    url: `${SITE_URL}/404`,
    ogImage: DEFAULT_OG,
    ogType: "website",
    noIndex: true,
  },
};

// Aliases so both uppercase and lowercase imports work safely:
export const seoPages = {
  ...baseConfigs,
  CAESES: baseConfigs.caeses,
  SHIPFLOW: baseConfigs.shipflow,
  TUTORIALS: baseConfigs.tutorials,
  HOME: baseConfigs.home,
  CONTACT: baseConfigs.contact,
};