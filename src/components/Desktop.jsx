import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import DesktopIcon from "./DesktopIcon";
import MiniPaint from "./MiniPaint";
import Projects from "./Projects";
import SnakeGame from "./SnakeGame";
import Skills from "./Skills";

function Terminal({ onCommand }) {
  const [history, setHistory] = useState([
    "sharyk@web:~$ Bienvenida al portafolio",
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      const response = onCommand(trimmed);

      if (trimmed === "clear") {
        setHistory([]);
      } else {
        const newHistory = [...history, `sharyk@web:~$ ${trimmed}`, ...response];
        setHistory(newHistory);
      }
      setInput("");
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="bg-black text-green-500 font-mono text-sm p-2 h-full overflow-auto"
    >
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div>
        <span>sharyk@web:~$ </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-black outline-none text-green-500 w-full"
          autoFocus
        />
      </div>
    </div>
  );
}

function WindowInstance({ id, title, content, i, onClose, draggingEnabled }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 60 + i * 30, y: 60 + i * 30 });

  return (
    <Rnd
      size={isMaximized ? { width: "100%", height: "100%" } : { width: 500, height: 350 }}
      position={isMaximized ? { x: 0, y: 0 } : position}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      className="absolute z-10"
      disableDragging={!draggingEnabled}
      enableResizing={!isMaximized}
      dragHandleClassName="window-header"
      onDragStop={(e, d) => {
        if (!isMaximized) setPosition({ x: d.x, y: d.y });
      }}
    >
      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
        <div className="window-header flex justify-between items-center px-3 py-2 bg-white/10 text-sm font-bold text-white rounded-t-lg cursor-move">
          <span>{title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-blue-300 hover:text-blue-200"
            >
              ⛶
            </button>
            <button
              onClick={() => onClose(id)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-3 text-white text-sm">
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      </div>
    </Rnd>
  );
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState(["about", "terminal"]);
  const [clock, setClock] = useState(new Date());
  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = (id) => {
    if (!openWindows.includes(id)) setOpenWindows([...openWindows, id]);
  };

  const handleClose = (id) => {
    setOpenWindows(openWindows.filter((win) => win !== id));
  };

  const handleCommand = (command) => {
    let output = [];
    switch (command) {
      case "help":
        output.push("Comandos disponibles: help, about, clear, projects, paint, snake");
        break;
      case "about":
        handleOpen("about");
        output.push("Abriendo ventana: Acerca de mí");
        break;
      case "projects":
        handleOpen("projects");
        output.push("Abriendo ventana: Proyectos");
        break;
      case "paint":
        handleOpen("paint");
        output.push("Abriendo ventana: MiniPaint");
        break;
      case "snake":
        handleOpen("snake");
        output.push("Abriendo minijuego: Snake Game");
        break;
      case "clear":
        output = [];
        break;
      case "":
        break;
      default:
        output.push(`Comando no reconocido: ${command}`);
    }
    return output;
  };

  const windowsData = [
    {
      id: "about",
      title: "Acerca de mí",
      content: "Hola, soy Sharyk Sofía. Soy desarrolladora web con pasión por el diseño accesible y las experiencias únicas.",
    },
    {
      id: "projects",
      title: "Proyectos",
      content: <Projects />,
    },
    {
      id: "terminal",
      title: "Terminal",
      content: <Terminal onCommand={handleCommand} />,
    },
    {
      id: "paint",
      title: "Mini Paint",
      content: <MiniPaint setDraggingEnabled={setDraggingEnabled} />,
    },
    {
      id: "snake",
      title: "Snake Game",
      content: <SnakeGame />,
    },
    {
      id: "skills",
      title: "Skills",
      content: <Skills />,
    },
  ];

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden text-white"
      style={{ backgroundImage: "url('multimedia/fondo.jpg')" }}
    >
      <DesktopIcon icon="📄" label="CV_Sharyk.pdf" position={{ x: 40, y: 60 }} onDoubleClick={() => window.open("/CV_Sharyk.pdf", "_blank")} />
      <DesktopIcon icon="🎨" label="MiniPaint" position={{ x: 40, y: 180 }} onDoubleClick={() => handleOpen("paint")} />
      <DesktopIcon icon="📁" label="Projects" position={{ x: 40, y: 300 }} onDoubleClick={() => handleOpen("projects")} />
      <DesktopIcon icon="🐍" label="Snake Game" position={{ x: 40, y: 420 }} onDoubleClick={() => handleOpen("snake")} />
      <DesktopIcon icon="🪛" label="Skills" position={{ x: 160, y: 60 }} onDoubleClick={() => handleOpen("skills")} />

      {showStartMenu && (
        <div className="absolute bottom-14 left-4 bg-black/80 p-4 rounded-lg w-72 z-50 shadow-lg">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <ul className="mt-2 max-h-60 overflow-y-auto">
            {windowsData
              .filter((win) => win.title.toLowerCase().includes(search.toLowerCase()))
              .map((win) => (
                <li
                  key={win.id}
                  onClick={() => {
                    handleOpen(win.id);
                    setShowStartMenu(false);
                    setSearch("");
                  }}
                  className="p-2 hover:bg-white/10 rounded cursor-pointer"
                >
                  {win.title}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="absolute bottom-0 w-full h-12 bg-black/30 backdrop-blur-md border-t border-white/20 flex items-center justify-between px-4">
        <div className="flex gap-4 items-center">
          <button onClick={() => setShowStartMenu((prev) => !prev)} className="p-2 hover:bg-white/10 rounded">🪟</button>
          {windowsData.map((win) => (
            <button
              key={win.id}
              onClick={() => handleOpen(win.id)}
              className="relative p-2 bg-transparent rounded hover:bg-white/10 transition"
            >
              📄
              {openWindows.includes(win.id) && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded" />
              )}
            </button>
          ))}
        </div>
        <div className="text-sm font-mono">
          {clock.toLocaleTimeString([], { hour12: false })}
        </div>
      </div>

      {openWindows.map((id, i) => {
        const win = windowsData.find((w) => w.id === id);
        if (!win) return null;

        return (
          <WindowInstance
            key={id}
            id={id}
            title={win.title}
            content={win.content}
            i={i}
            onClose={handleClose}
            draggingEnabled={draggingEnabled}
          />
        );
      })}
    </div>
  );
}

