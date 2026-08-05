const responses = {
  "explain basic solver": `The BASIC solver in SHIPFLOW uses potential flow theory to compute the wave pattern and wave resistance of a ship hull.

Key features:
• Rankine source panel method
• Non-linear free surface boundary conditions
• Fast computation (seconds to minutes)
• Ideal for early-stage hull design iterations

It solves the Laplace equation with appropriate boundary conditions on the hull and free surface.`,

  "basic vs rans": `BASIC (Potential Flow) vs RANS (Viscous Flow):

BASIC Solver:
• Inviscid flow assumption
• Computes wave resistance only
• Very fast (seconds)
• Good for hull form optimization
• No boundary layer modeling

RANS (XCHAP):
• Solves Reynolds-Averaged Navier-Stokes
• Captures viscous effects & separation
• Includes turbulence modeling
• Slower but more accurate
• Required for total resistance prediction

Recommendation: Use BASIC for initial screening, then RANS for final validation.`,

  "hull optimization": `SHIPFLOW hull optimization workflow:

1. Define Parameters — Set up hull geometry variables (beam, draft, section shapes)

2. BASIC Solver — Run potential flow for wave resistance (fast iterations)

3. Objective Function — Minimize total resistance or specific components

4. Optimization Loop — Use SHIPFLOW's built-in optimizer or connect to external tools (CAESES, Grasshopper)

5. RANS Validation — Verify best candidates with viscous solver

6. Analysis — Compare wave patterns, pressure distributions, and resistance components

Typical improvement: 3-8% resistance reduction achievable.`,

  "resistance prediction": `SHIPFLOW resistance prediction methods:

1. Wave Resistance (BASIC)
   — Potential flow panel method
   — Rankine sources on hull & free surface

2. Viscous Resistance (XCHAP)
   — RANS solver with k-ω SST turbulence
   — Resolves boundary layer & wake

3. Total Resistance
   — Wave + Viscous + Form factor
   — Correlation with model test data

4. Output includes:
   — Cw, Cf, Ct coefficients
   — Wave elevation contours
   — Pressure distribution on hull
   — Velocity field visualization

Accuracy: Typically within 2-4% of model test results.`,

  "search documentation": `SHIPFLOW documentation resources:

• User Manual — Complete solver reference
• Tutorial Guide — Step-by-step examples
• Theory Manual — Mathematical formulations
• Release Notes — Latest features & fixes

Key sections:
→ Getting Started: Basic setup & first run
→ BASIC Solver: Potential flow configuration
→ XCHAP: RANS solver settings
→ Grid Generation: Meshing best practices
→ Post-Processing: Result visualization

Visit flowtech.se/shipflow for latest docs.`,
};

const fallbackResponses = [
  "That's an interesting question about CFD analysis. In SHIPFLOW, you can approach this by configuring the appropriate solver module. Could you provide more details about your specific use case?",

  "SHIPFLOW provides several tools for that type of analysis. The workflow typically involves setting up the hull geometry, selecting the appropriate solver (BASIC for potential flow or XCHAP for viscous), and configuring the computational domain. What specific aspect would you like to explore?",

  "Great question! This relates to computational fluid dynamics for ship design. SHIPFLOW handles this through its integrated solver suite. For a detailed answer, I'd recommend checking the SHIPFLOW documentation or asking about a specific solver module.",

  "In naval architecture and CFD, this is an important consideration. SHIPFLOW's approach involves potential flow analysis (BASIC solver) for rapid evaluation and RANS simulation (XCHAP) for detailed viscous flow analysis. Would you like me to elaborate on either method?",
];

export function getSampleResponse(query) {
  const lower = query.toLowerCase().trim();

  // Check exact and partial matches
  for (const [key, response] of Object.entries(responses)) {
    if (lower.includes(key) || key.includes(lower)) {
      return response;
    }
  }

  // Check individual word matches
  const keywords = {
    basic: "explain basic solver",
    rans: "basic vs rans",
    xchap: "basic vs rans",
    hull: "hull optimization",
    optimization: "hull optimization",
    optimize: "hull optimization",
    resistance: "resistance prediction",
    prediction: "resistance prediction",
    drag: "resistance prediction",
    document: "search documentation",
    docs: "search documentation",
    manual: "search documentation",
    tutorial: "search documentation",
  };

  for (const [keyword, responseKey] of Object.entries(keywords)) {
    if (lower.includes(keyword)) {
      return responses[responseKey];
    }
  }

  // Fallback
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}