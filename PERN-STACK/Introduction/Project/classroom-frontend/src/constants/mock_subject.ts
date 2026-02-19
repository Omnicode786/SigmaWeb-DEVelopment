import type { Subject } from "@/types";

const departments = [
  "Computer Systems Engineering",
  "Software Engineering",
  "Electrical Engineering",
  "Artificial Intelligence",
  "Mathematics",
  "Physics",
  "Business Administration",
];

const courseTitles = [
  "Advanced Programming",
  "Operating Systems",
  "Database Systems",
  "Computer Networks",
  "Digital Logic Design",
  "Microprocessors",
  "Machine Learning",
  "Artificial Intelligence",
  "Linear Algebra",
  "Probability and Statistics",
  "Software Design Patterns",
  "Web Development",
  "Mobile App Development",
  "Cloud Computing",
  "Cyber Security",
  "Compiler Construction",
  "Embedded Systems",
  "Signals and Systems",
  "Control Systems",
  "Data Mining",
];


export const mockSubjects: Subject[] = [
  {
    id: 1,
    code: "CSE101",
    name: "Introduction to Programming",
    department: "Computer Systems Engineering",
    description:
      "Fundamental concepts of programming using C language including variables, loops, functions, and basic data structures.",
      createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "CSE205",
    name: "Data Structures and Algorithms",
    department: "Computer Systems Engineering",
    description:
      "Covers arrays, linked lists, stacks, queues, trees, sorting algorithms, and algorithm complexity analysis.",
      createdAt: new Date().toISOString(),
  
    },
  {
    id: 3,
    code: "MTH112",
    name: "Engineering Mathematics II",
    department: "Mathematics",
    description:
      "Topics include differential equations, Laplace transforms, matrices, eigenvalues, and their engineering applications.",
      createdAt: new Date().toISOString(),
  
    },

  {
    id: 4,
    code: "CSE210",
    name: "Object Oriented Programming",
    department: "Computer Systems Engineering",
    description:
      "Introduction to object-oriented concepts including classes, objects, inheritance, polymorphism, and encapsulation using C++.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    code: "CSE220",
    name: "Database Systems",
    department: "Software Engineering",
    description:
      "Study of relational databases, SQL queries, normalization, indexing, and transaction management.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    code: "CSE230",
    name: "Operating Systems",
    department: "Computer Systems Engineering",
    description:
      "Concepts of process management, memory allocation, file systems, scheduling algorithms, and concurrency.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    code: "CSE240",
    name: "Computer Networks",
    department: "Computer Systems Engineering",
    description:
      "Fundamentals of networking including OSI model, TCP/IP, routing, switching, and network security basics.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    code: "CSE250",
    name: "Software Engineering",
    department: "Software Engineering",
    description:
      "Software development life cycle, agile methodologies, requirement analysis, testing, and maintenance.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    code: "CSE260",
    name: "Artificial Intelligence",
    department: "Artificial Intelligence",
    description:
      "Introduction to AI concepts including search algorithms, knowledge representation, and intelligent agents.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    code: "CSE270",
    name: "Machine Learning",
    department: "Artificial Intelligence",
    description:
      "Supervised and unsupervised learning techniques including regression, classification, and clustering.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    code: "EEE101",
    name: "Circuit Analysis",
    department: "Electrical Engineering",
    description:
      "Analysis of electrical circuits using Kirchhoff’s laws, Ohm’s law, and network theorems.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    code: "EEE202",
    name: "Digital Logic Design",
    department: "Electrical Engineering",
    description:
      "Study of logic gates, Boolean algebra, combinational and sequential circuits.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    code: "EEE303",
    name: "Microprocessors",
    department: "Electrical Engineering",
    description:
      "Architecture and programming of microprocessors and microcontrollers.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    code: "MTH201",
    name: "Linear Algebra",
    department: "Mathematics",
    description:
      "Matrices, determinants, vector spaces, eigenvalues, and eigenvectors.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 15,
    code: "MTH202",
    name: "Probability and Statistics",
    department: "Mathematics",
    description:
      "Probability distributions, random variables, hypothesis testing, and statistical inference.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 16,
    code: "PHY101",
    name: "Applied Physics",
    department: "Physics",
    description:
      "Concepts of mechanics, thermodynamics, and electromagnetism for engineers.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 17,
    code: "BUS101",
    name: "Principles of Management",
    department: "Business Administration",
    description:
      "Fundamentals of management, leadership, organizational structure, and decision making.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 18,
    code: "BUS202",
    name: "Entrepreneurship",
    department: "Business Administration",
    description:
      "Business planning, startup strategies, market analysis, and innovation management.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 19,
    code: "CSE280",
    name: "Web Development",
    department: "Software Engineering",
    description:
      "Frontend and backend web technologies including HTML, CSS, JavaScript, and REST APIs.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 20,
    code: "CSE290",
    name: "Mobile Application Development",
    department: "Software Engineering",
    description:
      "Development of cross-platform mobile applications using modern frameworks.",
    createdAt: new Date().toISOString(),
  },
  


];
