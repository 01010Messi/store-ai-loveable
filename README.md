# AI Store Setup Engine

**"Shopify is too hard. AI makes it instant."**

This repository contains the full source code for an **AI-first E-commerce Onboarding Engine**. Unlike traditional store builders that require manual configuration of themes, products, and settings, this engine builds a complete store structure conversationally in seconds.

## 🚀 Problem Statement

Setting up an online store is overwhelming. Merchants face "Blank Canvas Paralysis" when asked to configure themes, upload products, and write policies from scratch.
**Solution**: An AI agent that interviews the merchant and *generates* the store for them.

## 🏗️ Architecture

The project is structured into two distinct modules:

| Module | Path | Description |
| :--- | :--- | :--- |
| **Frontend** | `/frontend` | React + Vite UI. Handles the chat interface, state visualization, and blueprint rendering. |
| **Backend** | `/backend` | Node.js + Express. Manages the conversation state, enforces business logic, and orchestrates Gemini AI calls. |

### End-to-End Flow
1.  **Onboarding**: User describes their idea (e.g., "I want to sell custom sneakers").
2.  **Clarification**: The AI asks exactly **3 smart questions** to narrow down Audience, Pricing, and Aesthetic.
3.  **Generation**: The Backend generates a structured **JSON Blueprint** containing products, pages, and layout config.
4.  **Result**: The Frontend renders this blueprint as a preview (and in future, provisions the DB).

## ✨ Key Product Decisions

-   **Deterministic Flow**: We enforce a strict 3-step clarification process to ensure predictability.
-   **Opinionated Inputs**: We use "Options + Other" to speed up data entry while retaining flexibility.
-   **India-First**: The engine is optimized for Indian context (₹ currency, local market nuances).
-   **Gemini Powered**: Uses `gemini-2.5-flash-lite` for speed and `gemini-2.5-flash` for quality.

## 🛠️ How to Run

A unified script is provided to start both services:

```bash
# From the root directory
bash run_app.sh
```

This will:
1.  Install dependencies for both frontend and backend.
2.  Start the Backend on `http://localhost:3000`.
3.  Start the Frontend on `http://localhost:8080`.

## 🔮 What's Next?
-   [ ] One-click deployment to hosting.
-   [ ] Integration with Payment Gateways (Razorpay).
-   [ ] Admin Dashboard generation based on Blueprint.

---
*Built with ❤️ by Antigravity.*
