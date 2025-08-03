let container = document.querySelector(".contain");

clutter = container.innerHTML
function addcards(title,channel,duration,time,views){
clutter += `<div class="card">
            <div class="thumbnail">
                <img  src="thumbnail.webp" alt="" >
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
        </div>
            <div class="line"></div>

    </div>`
container.innerHTML = clutter;

}

addcards("Web development Part 2","Code with Harry","19:39","3 months ago", "2500000");
addcards("Web development Part 3","Code with Harry","20:00","2 months ago", "3000000");
addcards("Web development Part 4","Code with Harry","18:45","1 month ago", "1500000");
addcards("Web development Part 5","Code with Harry","21:30","2 weeks ago", "5000000");
addcards("Web development Part 6","Code with Harry","22:15","1 week ago", "6000000");
addcards("Web development Part 7","Code with Harry","23:00","Just now", "7000000");