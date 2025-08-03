const videos = [
  { title: "Web development Part 2", channel: "Code with Harry", duration: "19:39", time: "3 months ago", views: "2,500,000" },
  { title: "Web development Part 3", channel: "Code with Harry", duration: "20:00", time: "2 months ago", views: "3,000,000" },
  { title: "Web development Part 4", channel: "Code with Harry", duration: "18:45", time: "1 month ago", views: "1,500,000" },
  { title: "Web development Part 5", channel: "Code with Harry", duration: "21:30", time: "2 weeks ago", views: "5,000,000" },
  { title: "Web development Part 6", channel: "Code with Harry", duration: "22:15", time: "1 week ago", views: "6,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },
  { title: "Web development Part 7", channel: "Code with Harry", duration: "23:00", time: "Just now", views: "7,000,000" },

];



const container = document.querySelector(".container");


let button = document.getElementById("btn");
button.addEventListener("click", () => {
videos.forEach(({ title, channel, duration, time, views }) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="thumbnail">
        <img src="thumbnail.webp" alt="">
        <div class="duration">${duration}</div>
    </div>
    <div class="main">
        <div class="upper">
            <h3 class="title">${title}</h3>
            <h4 class="channel">${channel}</h4>
        </div>
        <div class="flex">
            <div class="views">${views}</div>
            <div class="released">${time}</div>
        </div>
    </div>
  `;

  const line = document.createElement("div");
  line.className = "line";

  // Batch insert
  container.appendChild(card);
  container.appendChild(line);
});
// Clear the container before adding new cards
});
