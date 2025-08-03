let container = document.querySelector(".contain");

function addcards(title, channel, duration, time, views) {
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

    // Optional line divider after each card
    const line = document.createElement("div");
    line.classList.add("line");

    // Append to container
    container.appendChild(card);
    container.appendChild(line);
}
