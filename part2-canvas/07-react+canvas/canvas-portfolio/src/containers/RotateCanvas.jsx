import "../style/containers/RotateCanvas.css";

import {
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
  Bodies,
} from "matter-js";
import { useEffect, useRef } from "react";

function RotateCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    let engine, render, runner, mouse, mouseConstraint;

    initScreen();
    initMouse();
    initGround();

    canvas.addEventListener("mousewheel", () => {
      addRect(mouse.position.x, mouse.position.y, 50, 50);
    });

    function initScreen() {
      engine = Engine.create();
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "#1b1b19",
        },
      });
      runner = Runner.create();

      Render.run(render);
      Runner.run(runner, engine);
    }

    function initMouse() {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
      });

      Composite.add(engine.world, mouseConstraint);
    }

    function initGround() {
      const segments = 32;
      const deg = (Math.PI * 2) / segments;
      const width = 50;
      const radius = cw / 2 + width / 2;
      const height = radius * Math.tan(deg / 2) * 2;

      for (let i = 0; i < segments; i++) {
        const theta = deg * i;
        const x = Math.cos(theta) * radius + cw / 2;
        const y = Math.sin(theta) * radius + ch / 2;
        addRect(x, y, width, height, {
          isStatic: true,
          angle: theta,
          render: { lineWidth: 15 },
        });
      }
    }

    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    }
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
