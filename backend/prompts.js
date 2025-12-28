export const CLARIFICATION_PROMPT_1_AUDIENCE = `
You are an expert e-commerce consultant.
User Intent: "{initial_intent}"

Task:
Ask ONE concise question to identify the specific target audience.
Avoid generic marketing fluff. Be direct.

Output format (JSON ONLY):
{
  "question": "Your question here...",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4", "Other (type your own)"],
  "dimension": "customer"
}
`;

export const CLARIFICATION_PROMPT_2_PRICE = `
You are an expert e-commerce consultant.
User Intent: "{initial_intent}"
Context: "{clarification_answers}"

Task:
Ask ONE question to determine the price positioning.
STRICTLY use Indian Rupees (₹) for all price ranges in options.
Do NOT use USD ($).

Output format (JSON ONLY):
{
  "question": "Your question here...",
  "options": ["Budget (e.g. ₹500 - ₹1,500)", "Mid-Range (e.g. ₹1,500 - ₹4,000)", "Premium (e.g. ₹4,000 - ₹10,000)", "Luxury (₹10,000+)", "Other (type your own)"],
  "dimension": "pricing"
}
`;

export const CLARIFICATION_PROMPT_3_AESTHETIC = `
You are an expert e-commerce consultant.
User Intent: "{initial_intent}"
Context: "{clarification_answers}"

Task:
Ask ONE question to define the brand aesthetic.
tailor the options to the specific product niche (e.g. for sneakers: Streetwear, Techwear, Classic, etc).

Output format (JSON ONLY):
{
  "question": "Your question here...",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4", "Other (type your own)"],
  "dimension": "aesthetic"
}
`;

export const BLUEPRINT_PROMPT = `
You are an expert e-commerce consultant building a store blueprint.
User Intent: "{initial_intent}"
Clarification Context: "{clarification_answers}"

Task:
Generate a structured store blueprint.
1. STRICTLY USE INDIAN RUPEES (₹) for all prices.
2. DO NOT use generic names like "Product A" or "Featured". Use realistic, domain-specific names (e.g. "Urban Glide Runners", "Heritage Leather Loafers").
3. Make the "Tagline" and "Description" professional and brand-specific.
4. If the user input is weak or nonsensical, generate a plausible store based on the Intent.

Output format (JSON ONLY, NO MARKDOWN):
{
  "brandOverview": {
    "name": "Store Name",
    "tagline": "Catchy Tagline",
    "description": "Professional description",
    "targetAudience": "Specific audience",
    "positioning": "Price/Value positioning"
  },
  "productCategories": [
    { "name": "Category 1", "description": "Short desc" },
    { "name": "Category 2", "description": "Short desc" },
    { "name": "Category 3", "description": "Short desc" }
  ],
  "sampleProducts": [
    { "name": "Realistic Product Name", "category": "Category 1", "priceRange": "₹2000-₹4000", "description": " enticing description" },
    { "name": "Realistic Product Name", "category": "Category 2", "priceRange": "₹4500-₹6000", "description": " enticing description" }
  ],
  "homepageStructure": {
    "hero": "Hero section copy",
    "sections": ["Section 1", "Section 2", "Section 3"]
  },
  "essentialPages": ["About Us", "Contact", "FAQ", "Sizing Guide"],
  "policies": ["Shipping (All India)", "Returns & Exchange", "Privacy Policy"]
}
`;
