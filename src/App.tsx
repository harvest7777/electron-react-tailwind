import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";

function App() {
  const editorRef = useRef<HTMLDivElement>(null); // this is just for the container
  const viewRef = useRef<EditorView | null>(null); // this is the actual editor

  const test = () => {
    console.log(viewRef.current?.state.doc.toString());
  };

  useEffect(() => {
    // Setup CodeMirror editor once
    if (editorRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        doc: "Start document",
        parent: editorRef.current,
        extensions: [basicSetup, keymap.of([indentWithTab]), vim(), markdown()],
      });
    }

    // Cleanup on unmount
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`w-full h-screen`}>
      <div className="titlebar">
        <p className="draggable h-full flex-1 ">Cool titlebar</p>
        <button onClick={() => (window as any).versions?.minimizeWindow?.()}>
          Minimize
        </button>
        <button onClick={() => (window as any).versions?.maximizeWindow?.()}>
          Maximize
        </button>
        <button onClick={() => (window as any).versions?.closeWindow?.()}>
          Close
        </button>
      </div>

      {/* CodeMirror editor container */}
      <div
        ref={editorRef}
        style={{
          height: "80vh", // subtract titlebar height (adjust as needed)
          width: "100%",
        }}
      />
      <button className="bg-amber-500" onClick={test}>
        test button
      </button>
    </div>
  );
}

export default App;
