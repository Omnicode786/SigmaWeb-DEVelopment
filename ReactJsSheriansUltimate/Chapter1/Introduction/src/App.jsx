import './App.css'
import Card from "./components/Card"
function App() {
let name = "Muzammil Alam"
let role = "Engineering" 
let title = "Full stack AI developer"
let image = "https://media.licdn.com/dms/image/v2/D4D03AQHUo7bgsvBwew/profile-displayphoto-crop_800_800/B4DZhgB2bUGkAU-/0/1753957756704?e=1762992000&v=beta&t=j_EvaBqzlqBjeYgxp6HdvGlG1O5wjt6VprBD6w26EDw"
 const users = [
    {
      name: "Ava Harper",
      title: "Product Designer",
      role: "Design",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80&auto=format&fit=crop",
    },
    {
      name: "Mateo Rossi",
      title: "Full-Stack Engineer",
      role: "Engineering",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&q=80&auto=format&fit=crop",
    },
    {
      name: "Yuki Tanaka",
      title: "Product Manager",
      role: "Product",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=256&q=80&auto=format&fit=crop",
    },
    {
      name: "Noah Johnson",
      title: "Marketing Strategist",
      role: "Marketing",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&q=80&auto=format&fit=crop",
    },
    {
      name: "Sofia Almeida",
      title: "UI Developer",
      role: "Frontend",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=256&q=80&auto=format&fit=crop",
    },
  ];

return (
<>
      <div className="flex flex-wrap  justify-center">
<Card name={name} role={role} title={title} image={image}>

</Card>

{users.map((user,index)=>{

    return <Card key={index} {...user}></Card>
})}
</div>


<h1>Hello</h1>
</>


)
}

export default App
