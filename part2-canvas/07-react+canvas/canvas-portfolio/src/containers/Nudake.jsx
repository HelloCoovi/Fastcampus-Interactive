import { useEffect, useRef } from "react";
// import lodash from "lodash";
import throttle from "lodash/throttle";

import "../style/containers/Nudake.css";

import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";
import { getAngle, getDistance, getScrupedPercent } from "../utils/utils";

function Nudake() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    const imageSrcs = [image1, image2, image3];
    let currIndex = 0;
    let prevPos = { x: 0, y: 0 };

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      drawImage();
    }

    function drawImage() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const image = new Image();
      image.src = imageSrcs[currIndex];
      image.onload = () => {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

        const nextImage = imageSrcs[(currIndex + 1) % imageSrcs.length];
        canvasParent.style.backgroundImage = `url(${nextImage})`;
      };
    }

    function onMousedown(event) {
      console.log("onMousedown");
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseleave", onMouseUp);
      canvas.addEventListener("mousemove", onMouseMove);

      prevPos = { x: event.offsetX, y: event.offsetY };
    }

    function onMouseUp() {
      console.log("onMouseUp");
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    }
    function onMouseMove(event) {
      console.log("onMouseMove");
      drawCircles(event);

      checkPercent();
    }

    function drawCircles(event) {
      const nextPos = { x: event.offsetX, y: event.offsetY };
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      prevPos = nextPos;
    }

    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);

      if (percent > 50) {
        currIndex = (currIndex + 1) % imageSrcs.length;
        drawImage();
      }
    }, 500);

    canvas.addEventListener("mousedown", onMousedown);

    window.addEventListener("resize", resize);
    resize();

    return () => {
      canvas.removeEventListener("mousedown", onMousedown);

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="nudake">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Nudake;
