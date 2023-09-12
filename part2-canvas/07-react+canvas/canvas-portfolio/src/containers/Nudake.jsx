import { useEffect, useRef } from "react";

import "../style/containers/Nudake.css";

import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";

function Nudake() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    const imageSrcs = [image1, image2, image3];
    let currIndex = 0;

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
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      };
    }

    window.addEventListener("resize", resize);
    resize();

    return () => {
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
