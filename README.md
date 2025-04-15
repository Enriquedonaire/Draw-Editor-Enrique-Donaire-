# Drawing Editor

A simple drawing editor built with Next.js, tldraw, and tRPC.

## Features

- Interactive drawing canvas powered by tldraw
- Real-time shape manipulation
- Server-side persistence with tRPC
- Modern UI with Tailwind CSS and shadcn/ui

## Additional Features
- From text to shape feature
- Using @tldraw/ai

## Tech Stack

- Next.js
- TailwindCSS
- shadcn/ui
- tRPC
- tldraw

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

The application uses tRPC for type-safe API calls. The main endpoints are:

- `drawing.getDrawing`: Retrieves the current drawing state
- `drawing.saveDrawing`: Saves the current drawing state

## Project Structure

```
├── app/
│   ├── api/
│   │   └── trpc/
│   ├── editor/
│   │   └── page.tsx
│   └── page.tsx
├── server/
│   ├── routers/
│   │   └── drawing.ts
│   ├── trpc.ts
│   └── index.ts
└── utils/
    └── trpc.ts
```

## Development

The project uses Next.js 13 with the App Router. The main components are:

- `/app/page.tsx`: Landing page
- `/app/editor/page.tsx`: Drawing editor interface
- `/server/routers/drawing.ts`: tRPC router for drawing operations

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request