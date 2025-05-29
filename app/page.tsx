"use client";

import { Tldraw, loadSnapshot, getSnapshot } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Square, MessageSquare } from "lucide-react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

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
    <div className="h-screen w-full flex flex-col mt-[-58px] overflow-y-hidden">
      <div className="flex items-center gap-2 p-0 border-b justify-between min-h-0" style={{paddingTop: 0, paddingBottom: 0, marginTop: 0, minHeight: 0, height: '56px'}}>
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
        <div className="flex items-center gap-2 mr-6" style={{ marginTop: 0 }}>
          <Image src="/EgoStudio.png" alt="EgoStudio logo" width={48} height={48} />
          <div className="flex flex-col">
            <span style={{fontWeight:'bold',fontSize:'1.2rem', background: 'linear-gradient(90deg, #d11081 0%, rgba(0, 204, 255, 1) 100%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>EgoStudio</span>
            <span style={{fontSize:'0.8rem', background: 'linear-gradient(90deg, #4a4a4a 0%, #9a9a9a 100%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Drawing Editor</span>
          </div>
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