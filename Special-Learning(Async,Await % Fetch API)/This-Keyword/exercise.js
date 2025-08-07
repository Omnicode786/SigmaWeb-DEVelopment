let form = document.querySelector("form");
let userName =  document.querySelector("#username");
let role =  document.querySelector("#role");
let bio =  document.querySelector("#bio");
let photo =  document.querySelector("#photo-url");
let people = document.querySelector(".people")

const userManager = {
    users: [],
    init: function() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log(this);

            // ye jo this he because this is inside an event listener it willl be referd to as the element on which the event is on at
// ab ham 2 use case se this ko kch bna skte hen aik to agar hame this ko iska object hi bnana he to simple arrow function use krlo
// lkn agar hame this ko koi or sa object bnanahe to phir
        })
          form.addEventListener("submit", /*ye jo this he ye basically yahan pr ye object he matlab ham this ke submit form ke method ko chla rhe hen*/this.submitForm.bind(this));


// because of doing this what we are doing is basically running that function and binding it with the object now we can pass any object there we passed this because in that scope this is already that particular object
// that we want to target


    },
    submitForm: function(e){
        e.preventDefault();
        console.log("Form submitted");
            console.log(this);
       
        // even here this will be the form 

        // but since we are calling it using bind it wil be object now
        this.addUser();
    this.appendUser();
        // this.downloadAsTextFile(); 
    },
    addUser: function () {
         this.users.push({
            userName: userName.value,
            role: role.value,
            bio: bio.value,
            url: photo.value
        })

    },
    appendUser: function(){
        people.innerHTML = "";
        this.users.forEach((user) => {
 clutter = `<div class="container2">
            <div class="image"><img id="profile" src="${user.url}" alt="userprofile"></div>
               <div class="texts">
            <div class="userName">${user.userName}</div>
            <div class="Userrole">${user.role}</div>
            <div class="UserBio">${user.bio}</div>
            </div>
        </div>`
        people.insertAdjacentHTML("beforeend", clutter);
        // we can also do as 
        // people.appendChild(clutter);
        })
       
        console.log("this function is running")
    },
    removeUser: function() {},
    downloadAsTextFile: function () {
    const latestUser = this.users;
    console.log("this is the latest user",latestUser);
    const textData = `
Username: ${latestUser.userName}
Role: ${latestUser.role}
Bio: ${latestUser.bio}
Photo URL: ${latestUser.url}
-----------------------
`;

// to save all users into the file

if (this.users.length === 0) return;

const allUserstext = this.users.map((user,index) => {
    return `User ${index + 1}
    Username: ${user.userName}
    Role: ${user.role}
    Bio: ${user.bio}
    Photo URL: ${user.url}`
}).join("\n\n");


    const blob = new Blob([allUserstext], { type: "text/plain" });

// blob is a binary large object
// - Think of it as a **fake file stored in memory**.
// - And you tell it the MIME type: `"text/plain"` for `.txt` files.

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
// the blob is then created into an object url
// a.href simply sets the href tag of the anchor tag as that url


    a.download = "user_data.txt";
// download simply downloads it
    a.click();
    URL.revokeObjectURL(a.href);
}
}

userManager.init();