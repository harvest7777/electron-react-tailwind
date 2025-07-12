import React, { useState, useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";

function App() {
  const editorRef = useRef(null); // this is just for the container
  const viewRef = (useRef < EditorView) | (null > null); // this is the actual editor

  const test = () => {
    console.log(viewRef.current?.state.doc.toString());
  };

  useEffect(() => {
    // Setup CodeMirror editor once
    if (editorRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        doc: "Start document",
        parent: editorRef.current,
        extensions: [basicSetup, vim()],
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
        <button onClick={() => window.versions.minimizeWindow()}>
          Minimize
        </button>
        <button onClick={window.versions.maximizeWindow()}>Maximize</button>
        <button onClick={() => window.versions.closeWindow()}>Close</button>
      </div>

      {/* CodeMirror editor container */}
      <div
        ref={editorRef}
        style={{
          height: "calc(100vh - 40px)", // subtract titlebar height (adjust as needed)
          width: "100%",
        }}
      />
      <button className="bg-amber-500">test button</button>
    </div>
  );
}

export default App;
