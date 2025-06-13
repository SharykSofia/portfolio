import React, { useRef, useState, useEffect } from "react";

export default function MiniPaint({ setDraggingEnabled }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
    setDrawing(true);
    setDraggingEnabled(false); // Desactiva arrastre
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (drawing) {
      setDrawing(false);
      setDraggingEnabled(true); // Vuelve a activar arrastre
    }
  };

  return (
    <div className="w-full h-full bg-white rounded overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}
