import React, { useEffect, useState } from "react";

const CELL_SIZE = 20;
const WIDTH = 300;
const HEIGHT = 300;
const DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

function getRandomPosition() {
  return [
    Math.floor(Math.random() * (WIDTH / CELL_SIZE)),
    Math.floor(Math.random() * (HEIGHT / CELL_SIZE)),
  ];
}

export default function SnakeGame() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);

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
          newHead[0] >= WIDTH / CELL_SIZE ||
          newHead[1] >= HEIGHT / CELL_SIZE ||
          prev.some((s) => s[0] === newHead[0] && s[1] === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomPosition());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  return (
    <div
      className="bg-black"
      style={{
        width: WIDTH,
        height: HEIGHT,
        position: "relative",
      }}
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
