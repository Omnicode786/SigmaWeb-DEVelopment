let form = document.querySelector("form");
let userName = document.querySelector("#username");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo-url");
let people = document.querySelector(".people");

const userManager = {
  users: [],

  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();

    const newUser = {
      userName: userName.value,
      role: role.value,
      bio: bio.value,
      url: photo.value,
    };

    this.users.push(newUser);
    this.appendUser();

    // Optional: download users as txt
    this.downloadUsersAsTxt();

    form.reset();
  },

  appendUser: function () {
    people.innerHTML = ""; // clear existing users
    this.users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "container2";
      card.innerHTML = `
        <div class="image"><img id="profile" src="${user.url}" alt="userprofile"></div>
        <div class="userName">${user.userName}</div>
        <div class="Userrole">${user.role}</div>
        <div class="UserBio">${user.bio}</div>
      `;
      people.appendChild(card);
    });
  },

  downloadUsersAsTxt: function () {
    let textData = this.users
      .map((u, i) => {
        return `User ${i + 1}:\nName: ${u.userName}\nRole: ${u.role}\nBio: ${u.bio}\nPhoto: ${u.url}\n`;
      })
      .join("\n-------------------\n");

    const blob = new Blob([textData], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  },
};

userManager.init();
