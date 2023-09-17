import "../style/containers/RotateCanvas.css";

import {
  Engine,
  Render,
  Runner,
  Mouse,
  MouseConstraint,
  Composite,
  Bodies,
  Events,
} from "matter-js";
import { useEffect, useRef } from "react";

import IconAFRAME from "../assets/icon_AFRAME.png";
import IconCSS from "../assets/icon_CSS.png";
import IconHTML from "../assets/icon_HTML.png";
import IconJS from "../assets/icon_JS.png";
import IconREACT from "../assets/icon_REACT.png";
import IconTHREE from "../assets/icon_THREE.png";

function RotateCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    const gravityPower = 0.5;
    let gravityDeg = 0;

    let engine, render, runner, mouse, mouseConstraint;

    initScreen();
    initMouse();
    initGround();
    initImageBoxes();

    Events.on(runner, "tick", () => {
      gravityDeg += 1;
      engine.world.gravity.x =
        gravityPower * Math.cos((Math.PI / 180) * gravityDeg);
      engine.world.gravity.y =
        gravityPower * Math.sin((Math.PI / 180) * gravityDeg);
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
        });
      }
    }

    function initImageBoxes() {
      const scale = 0.7;
      const t1 = { w: 250 * scale, h: 250 * scale };
      const t2 = { w: 732 * scale, h: 144 * scale };

      addRect(cw / 2, ch / 2, t1.w, t1.h, {
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconJS, xScale: scale, yScale: scale } },
      });
      addRect(cw / 2 - t1.w, ch / 2, t1.w, t1.h, {
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconCSS, xScale: scale, yScale: scale } },
      });
      addRect(cw / 2 + t1.w, ch / 2, t1.w, t1.h, {
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconHTML, xScale: scale, yScale: scale } },
      });
      addRect(cw / 2, ch / 2 + t1.h, t1.w, t1.h, {
        chamfer: { radius: 20 },
        render: {
          sprite: { texture: IconTHREE, xScale: scale, yScale: scale },
        },
      });
      addRect(cw / 2 - t1.w, ch / 2 + t1.h, t1.w, t1.h, {
        chamfer: { radius: 75 },
        render: {
          sprite: { texture: IconREACT, xScale: scale, yScale: scale },
        },
      });
      addRect(cw / 2, ch / 2 - t2.h, t2.w, t2.h, {
        chamfer: { radius: 20 },
        render: {
          sprite: { texture: IconAFRAME, xScale: scale, yScale: scale },
        },
      });
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
