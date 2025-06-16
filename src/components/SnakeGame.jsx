import React, { useEffect, useState, useRef } from "react";

const CELL_SIZE = 20;
const DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

function getRandomPosition(cols, rows) {
  return [
    Math.floor(Math.random() * cols),
    Math.floor(Math.random() * rows),
  ];
}

export default function SnakeGame() {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ cols: 15, rows: 15 });
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const cols = Math.floor(clientWidth / CELL_SIZE);
        const rows = Math.floor(clientHeight / CELL_SIZE);
        setContainerSize({ cols, rows });
        setFood(getRandomPosition(cols, rows));
        setSnake([[5, 5]]);
        setGameOver(false);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDir = DIRECTIONS[e.key];
      if (newDir) setDirection(newDir);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;
      setSnake((prev) => {
        const newHead = [
          prev[0][0] + direction[0],
          prev[0][1] + direction[1],
        ];

        if (
          newHead[0] < 0 ||
          newHead[1] < 0 ||
          newHead[0] >= containerSize.cols ||
          newHead[1] >= containerSize.rows ||
          prev.some((s) => s[0] === newHead[0] && s[1] === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomPosition(containerSize.cols, containerSize.rows));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, containerSize]);

  return (
    <div
      ref={containerRef}
      className="bg-black w-full h-full relative"
    >
      {snake.map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x * CELL_SIZE,
            top: y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            background: "lime",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: food[0] * CELL_SIZE,
          top: food[1] * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          background: "red",
        }}
      />
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-bold text-lg">
          ¡Game Over!
        </div>
      )}
    </div>
  );
}
