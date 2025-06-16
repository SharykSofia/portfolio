import React from "react";

export default function Skills() {
  const skills = [
    {
      name: "Canva",
      image: "multimedia/canva.png",
    },
    {
      name: "Illustrator",
      image: "multimedia/html.png",
    },
    {
      name: "Yuredo (cortometraje étnico)",
      image: "multimedia/canva.png",
    },
    {
      name: "Rin y Umbrio (RA accesible)",
      image: "multimedia/html.png",
    },
  ];

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <a
            key={index}
            href={skill.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center hover:bg-gray-800 p-3 rounded-lg transition cursor-pointer"
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-sm text-center">{skill.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
