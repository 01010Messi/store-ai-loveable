# AI Store Frontend

This React + Vite application serves as the user interface for the **AI Store Setup Engine**. It provides a conversational experience where users can build a complete e-commerce store blueprint using natural language.

Developed with **Lovable** (UI components) and **Tailwind CSS**.

## Key Features

-   **Conversational Interface**: A chat-based flow that guides the user from intent to blueprint.
-   **Step-by-Step Logic**:
    1.  **Initial Intent**: "Describe your business."
    2.  **Clarification**: 3 rounds of multiple-choice questions (Audience, Price, Aesthetic).
    3.  **Blueprint Generation**: Final detailed JSON visualization.
-   **Smart UX**:
    -   **"Other" Option**: Selection of "Other" auto-focuses the chat input for custom text.
    -   **Setup Guide**: Left-sidebar visualizes progress through the 3 implementation steps.
    -   **Two-Column Layout**: Setup Guide (Left) + Chat/Content (Right).

## Project Structure

-   `/src`: Source code
    -   `/components`: React components (`ChatContainer`, `BlueprintDisplay`, `SetupGuide`).
    -   `/pages`: Main `Index.tsx` entry point.
    -   `/hooks`: Custom hooks (e.g. `use-toast`).
-   `/public`: Static assets.

## Integration

Communcates with the backend via `POST /chat`.
-   **Endpoint**: `http://localhost:3000/chat`
-   **Payload**: Sends `message` and `conversation_state`.
-   **Response**: Receives `reply`, `options`, `conversation_state`, and optional `blueprint`.

## Running Locally

```bash
npm install
npm run dev
```

The app will start at `http://localhost:8080`.
