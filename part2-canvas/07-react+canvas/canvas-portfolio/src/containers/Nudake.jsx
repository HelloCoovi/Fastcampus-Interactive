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
      canvas.style.height = `${canvasHeight}px`;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    let x = 0;
    let y = 0;
    let vx = 20;
    let vy = 20;
    let size = 200;

    let frameId;

    function frame() {
      frameId = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (x < 0) {
        x = 0;
        vx *= -1;
      } else if (x > canvasWidth - size) {
        x = canvasWidth - size;
        vx *= -1;
      } else if (y < 0) {
        y = 0;
        vy *= -1;
      } else if (y > canvasHeight - size) {
        y = canvasHeight - size;
        vy *= -1;
      }

      x += vx;
      y += vy;

      ctx.fillRect(x, y, size, size);
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
