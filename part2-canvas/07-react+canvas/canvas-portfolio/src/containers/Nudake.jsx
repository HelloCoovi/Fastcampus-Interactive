import { useEffect, useRef } from "react";

import "../style/containers/Nudake.css";

function Nudake() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}` + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    let frameId;

    function frame() {
      frameId = requestAnimationFrame(frame);

      ctx.fillRect(100, 100, 100, 100);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      // 🎯
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="nudake">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Nudake;
