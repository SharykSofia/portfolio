import React from "react";

export default function Projects() {
  const projects = [
    {
      name: "Sitio Web Tecniplus Soluciones",
      link: "https://tecniplusss.great-site.net/?i=1",
    },
    {
      name: "Tienda saludable (Pastel & Co.)",
      link: "#",
    },
    {
      name: "Yuredo (cortometraje étnico)",
      link: "#",
    },
    {
      name: "Rin y Umbrio (RA accesible)",
      link: "#",
    },
  ];

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Proyectos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center hover:bg-gray-800 p-3 rounded-lg transition cursor-pointer"
          >
            <span className="text-4xl">📁</span>
            <span className="text-sm text-center mt-2">{project.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
