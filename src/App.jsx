import React, { useState, useEffect } from "react";

function App() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Listen for window state changes from main process
    window.windowState?.onStateChange((event, maximized) => {
      setIsMaximized(maximized);
    });

    // Cleanup listener on unmount
    return () => {
      window.windowState?.removeListener();
    };
  }, []);

  const func = async () => {
    console.log("tryna ping");
    // const response = await window.versions.ping();
    // console.log(response); // prints out 'pong'
  };

  const handleMaximize = () => {
    window.versions.maximizeWindow();
  };

  return (
    <div className={`w-full h-screen ${isMaximized ? "maximized" : ""}`}>
      <div className="titlebar">
        <p className="draggable h-full flex-1 ">Cool titlebar</p>
        <button onClick={() => window.versions.minimizeWindow()}>
          Minimize
        </button>
        <button onClick={handleMaximize}>
          {isMaximized ? "Restore" : "Maximize"}
        </button>
        <button onClick={() => window.versions.closeWindow()}>Close</button>
      </div>
      <button onClick={() => func()}>click meee</button>
    </div>
  );
}

export default App;
