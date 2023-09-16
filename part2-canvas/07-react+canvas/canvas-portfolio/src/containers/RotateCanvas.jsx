import "../style/containers/RotateCanvas.css";

import {
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
} from "matter-js";
import { useEffect, useRef } from "react";

function RotateCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    const engine = Engine.create();
    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "#1b1b19",
      },
    });
    const runner = Runner.create();

    Render.run(render);
    Runner.run(runner, engine);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
    });

    Composite.add(engine.world, mouseConstraint);
  }, []);

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>Javascript</h1>
        <h2>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown
        </p>
      </aside>
    </div>
  );
}

export default RotateCanvas;
