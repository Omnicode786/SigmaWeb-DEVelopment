import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RiBookMarkedFill } from '@remixicon/react'
import './App.css'

import HiringCard from './components/HiringCard'





function App() {
  const [count, setCount] = useState(0)

const jobs = [
  {
    id: 1,
    companyLogo:
      "https://www.blog.thebrandshopbw.com/wp-content/uploads/2022/01/Amazon-Logo-1.jpg",
    companyName: "Amazon",
    timePosted: "5 days ago",
    role: "Senior UI/UX Designer",
    jobType: ["Part-Time", "Senior-Level"],
    rate: "120/hr",
    location: "San Francisco",
  },
  {
    id: 2,
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    companyName: "Google",
    timePosted: "2 days ago",
    role: "Frontend Developer",
    jobType: ["Full-Time", "Mid-Level"],
    rate: "95/hr",
    location: "Mountain View",
  },
  {
    id: 3,
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    companyName: "Microsoft",
    timePosted: "1 week ago",
    role: "Backend Engineer",
    jobType: ["Contract", "Senior-Level"],
    rate: "110/hr",
    location: "Seattle",
  },
  {
    id: 4,
    companyLogo: "https://logo.clearbit.com/meta.com",
    companyName: "Meta",
    timePosted: "3 days ago",
    role: "Product Designer",
    jobType: ["Internship", "Junior-Level"],
    rate: "60/hr",
    location: "Menlo Park",
  },
  {
    id: 5,
    companyLogo: "https://logo.clearbit.com/tesla.com",
    companyName: "Tesla",
    timePosted: "1 day ago",
    role: "Automation Engineer",
    jobType: ["Full-Time", "Senior-Level"],
    rate: "130/hr",
    location: "Austin",
  },
  {
    id: 6,
    companyLogo: "https://logo.clearbit.com/netflix.com",
    companyName: "Netflix",
    timePosted: "2 weeks ago",
    role: "Creative Director",
    jobType: ["Full-Time", "Executive"],
    rate: "150/hr",
    location: "Los Angeles",
  },
  {
    id: 7,
    companyLogo: "https://logo.clearbit.com/spotify.com",
    companyName: "Spotify",
    timePosted: "6 days ago",
    role: "Data Analyst",
    jobType: ["Remote", "Mid-Level"],
    rate: "90/hr",
    location: "New York",
  },
  {
    id: 8,
    companyLogo: "https://logo.clearbit.com/twitter.com",
    companyName: "X (Twitter)",
    timePosted: "4 days ago",
    role: "Mobile Developer",
    jobType: ["Full-Time", "Senior-Level"],
    rate: "115/hr",
    location: "San Francisco",
  },
  {
    id: 9,
    companyLogo: "https://logo.clearbit.com/apple.com",
    companyName: "Apple",
    timePosted: "8 hours ago",
    role: "Product Manager",
    jobType: ["Full-Time", "Senior-Level"],
    rate: "140/hr",
    location: "Cupertino",
  },
  {
    id: 10,
    companyLogo: "https://blog.adobe.com/en/publish/2020/05/28/media_1d87bf78b1ce19defbef0c7858b4df696215a4048.png?width=750&format=png&optimize=medium",
    companyName: "Adobe",
    timePosted: "1 week ago",
    role: "Graphic Designer",
    jobType: ["Contract", "Mid-Level"],
    rate: "85/hr",
    location: "San Jose",
  },
  {
    id: 11,
    companyLogo: "https://logo.clearbit.com/linkedin.com",
    companyName: "LinkedIn",
    timePosted: "3 days ago",
    role: "Software Engineer",
    jobType: ["Full-Time", "Entry-Level"],
    rate: "75/hr",
    location: "Sunnyvale",
  },
  {
    id: 12,
    companyLogo: "https://substackcdn.com/image/fetch/$s_!1XDp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb162f2d8-7878-4f8c-9b3f-6184293024dc_1000x1000.jpeg",
    companyName: "IBM",
    timePosted: "2 weeks ago",
    role: "AI Researcher",
    jobType: ["Full-Time", "Senior-Level"],
    rate: "125/hr",
    location: "Armonk",
  },
  {
    id: 13,
    companyLogo: "https://logo.clearbit.com/intel.com",
    companyName: "Intel",
    timePosted: "1 day ago",
    role: "Hardware Engineer",
    jobType: ["Full-Time", "Mid-Level"],
    rate: "100/hr",
    location: "Portland",
  },
  {
    id: 14,
    companyLogo: "https://logo.clearbit.com/atlassian.com",
    companyName: "Atlassian",
    timePosted: "5 days ago",
    role: "QA Engineer",
    jobType: ["Remote", "Entry-Level"],
    rate: "70/hr",
    location: "Sydney",
  },
  {
    id: 15,
    companyLogo: "https://logo.clearbit.com/shopify.com",
    companyName: "Shopify",
    timePosted: "2 days ago",
    role: "Full Stack Developer",
    jobType: ["Full-Time", "Mid-Level"],
    rate: "105/hr",
    location: "Toronto",
  },
  {
    id: 16,
    companyLogo: "https://logo.clearbit.com/airbnb.com",
    companyName: "Airbnb",
    timePosted: "3 days ago",
    role: "UX Researcher",
    jobType: ["Part-Time", "Mid-Level"],
    rate: "95/hr",
    location: "San Francisco",
  },
  {
    id: 17,
    companyLogo: "https://logo.clearbit.com/stripe.com",
    companyName: "Stripe",
    timePosted: "1 week ago",
    role: "Finance Analyst",
    jobType: ["Remote", "Senior-Level"],
    rate: "120/hr",
    location: "Dublin",
  },
  {
    id: 18,
    companyLogo: "https://logo.clearbit.com/paypal.com",
    companyName: "PayPal",
    timePosted: "4 days ago",
    role: "Risk Analyst",
    jobType: ["Full-Time", "Mid-Level"],
    rate: "88/hr",
    location: "Phoenix",
  },
  {
    id: 19,
    companyLogo: "https://logo.clearbit.com/slack.com",
    companyName: "Slack",
    timePosted: "6 days ago",
    role: "Customer Success Manager",
    jobType: ["Full-Time", "Entry-Level"],
    rate: "65/hr",
    location: "Vancouver",
  },
  {
    id: 20,
    companyLogo: "https://logo.clearbit.com/redhat.com",
    companyName: "Red Hat",
    timePosted: "8 days ago",
    role: "DevOps Engineer",
    jobType: ["Contract", "Mid-Level"],
    rate: "110/hr",
    location: "Raleigh",
  },
];


// Tip: To quickly generate 60, you can copy these and change the names/logos/roles slightly.
// Or if you prefer, I can generate the full 60 unique ones automatically for you.




  return (
    <>
    <div className="overall flex flex-wrap">
{jobs.map((job,index)=>{
return <HiringCard key={index} {...job}></HiringCard>

})}
    </div>
   

    </>
  )
}

export default App
