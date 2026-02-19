const SKILL_DB = {

  programming: [
    { name: "Java", weight: 3 },
    { name: "C++", weight: 3 },
    { name: "Python", weight: 3 },
    { name: "C", weight: 2 }
  ],

  cs_fundamentals: [
    { name: "Data Structures", weight: 3 },
    { name: "Algorithms", weight: 3 },
    { name: "OOP", weight: 2 },
    { name: "Object Oriented Programming", weight: 2 },
    { name: "System Design", weight: 3 },
    { name: "Operating Systems", weight: 2 },
    { name: "DBMS", weight: 2 },
    { name: "Computer Networks", weight: 2 }
  ],  
  frontend: [
    { name: "React", weight: 3 },
    { name: "JavaScript", weight: 3 },
    { name: "HTML", weight: 1 },
    { name: "CSS", weight: 1 }
  ],

  backend: [
    { name: "Node.js", weight: 3 },
    { name: "Express", weight: 2 }
  ],

  cloud: [
    { name: "AWS", weight: 3 },
    { name: "Docker", weight: 2 }
  ],

  tools: [
    { name: "Git", weight: 1 },
    { name: "GitHub", weight: 1 }
  ]
};

module.exports = SKILL_DB;
