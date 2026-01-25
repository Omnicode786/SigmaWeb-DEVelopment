import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'

const App = () => {
const users = [
  { id: 1, paragraph: "Thoughtful portrait of a person looking ahead.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 2, paragraph: "Double exposure portrait of a fashion model outdoors.", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 3, paragraph: "Photographer capturing moments in nature.", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 4, paragraph: "Grayscale thoughtful portrait emphasizing emotion.", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 5, paragraph: "Close-up, black and white portrait with deep expression.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 6, paragraph: "Woman enjoying a bright day outdoors.", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 7, paragraph: "Man standing confidently against a dark backdrop.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 8, paragraph: "Close-up portrait with long hair flowing in wind.", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 9, paragraph: "Happy subject smiling outdoors.", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 10, paragraph: "Casual portrait of a person standing outside.", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 11, paragraph: "Woman sitting relaxed in modern indoor portrait.", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 12, paragraph: "Portrait with soft dramatic light and serene expression.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 13, paragraph: "Stylish individual captured in artistic portrait.", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 14, paragraph: "Person in nature, bathed in gentle sunlight.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 15, paragraph: "Confident model posing outdoors.", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 16, paragraph: "Serene portrait with natural background.", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 17, paragraph: "Creative thinker lost in thought.", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 18, paragraph: "Warm smile with soft natural lighting.", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 19, paragraph: "Portrait of a person enjoying the breeze.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
  { id: 20, paragraph: "Peaceful portrait among gentle shadows.", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=faces" },
];



  return (
    <>   
    <Section1 users = {users}></Section1>
    <Section2></Section2>
  </>

  )
}

export default App