import React from "react";
import { Rnd } from "react-rnd";

export default function DesktopIcon({ icon, label, onDoubleClick, position }) {
  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 80,
        height: 90,
      }}
      bounds="parent"
      enableResizing={false}
    >
      <div
        onDoubleClick={onDoubleClick}
        className="flex flex-col items-center justify-center text-white cursor-pointer select-none"
      >
        <div className="text-3xl">{icon}</div>
        <span className="text-xs text-center mt-1">{label}</span>
      </div>
    </Rnd>
  );
}
