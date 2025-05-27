"use client";

import { Tldraw, loadSnapshot, getSnapshot } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Square, MessageSquare } from "lucide-react";
import { trpc } from "@/utils/trpc";

export default function EditorPage() {
  const [editor, setEditor] = useState<any>(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const loadDrawing = async () => {
      if (!editor) return;
      
      try {
        const savedDrawing = await trpc.drawing.getDrawing.query();
        if (savedDrawing) {
          await loadSnapshot(editor, savedDrawing);
        }
      } catch (error) {
        console.error("Error loading drawing:", error);
      }
    };

    loadDrawing();
  }, [editor]);

  const handleMount = (editor: any) => {
    setEditor(editor);

    editor.store.listen(async () => {
      try {
        const snapshot = await getSnapshot(editor.store);
        await trpc.drawing.saveDrawing.mutate(snapshot);
      } catch (error) {
        console.error("Error saving drawing:", error);
      }
    }, { source: 'user', scope: 'document' });
  };

  const addSquare = () => {
    if (!editor) return;
    
    editor.createShapes([
      {
        type: "geo",
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          color: "blue",
        },
      },
    ]);
  };

  const generateShapeFromPrompt = () => {
    if (!editor || !prompt) return;

    let shape;
    if (prompt.toLowerCase().includes("square")) {
      shape = {
        type: "geo",
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          color: "blue",
        },
      };
    } else if (prompt.toLowerCase().includes("circle")) {
      shape = {
        type: "geo",
        props: {
          geo: "ellipse",
          w: 100,
          h: 100,
          color: "red",
        },
      };
    } else if (prompt.toLowerCase().includes("triangle")) {
      shape = {
        type: "geo",
        props: {
          geo: "triangle",
          w: 100,
          h: 100,
          color: "green",
        },
      };
    }

    if (shape) {
      editor.createShapes([shape]);
      setPrompt("");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 p-2 border-b justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={addSquare}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            Add Square
          </Button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type square, circle, or triangle"
            className="border rounded px-2 py-1"
          />
          <Button
            onClick={generateShapeFromPrompt}
            variant="outline"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Generate
          </Button>
        </div>
        <div className="flex items-center" style={{marginRight: '1.5rem'}}>
          <img src="/EgoStudio.png" alt="EgoStudio logo" style={{height:38}} />
          <span style={{fontWeight:'bold',fontSize:'1.5rem', marginLeft: '0.5rem', background: 'linear-gradient(90deg, #c61e80 0%, rgba(0, 204, 255, 1) 100%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>EgoStudio</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <Tldraw 
          onMount={handleMount}
          persistenceKey="drawing-persistence"
        />
      </div>
    </div>
  );
}