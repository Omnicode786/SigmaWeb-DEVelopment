   let card = document.querySelector(".card");
        let closeBtn = document.querySelector(".close-btn");

        let body = document.querySelector("body");
        let arr = [
            "Hacking into your computer", "Got access to the main machine", "Getting passwords folder", "Attainign data", "Hacking windows", "sending data to server"];

        let c = Math.random() * 100

        // my initial approach 

        // setInterval(() => {
        //     arr.forEach((e) => {
        //       setInterval(() => {
        //           c = Math.random() * 100
        //             let clutter = `<div class="card"  style="position: absolute; top: ${ Math.random() * 1000}px; left: ${ Math.random() * 1000}px;";>
        //             <div class="header">
        //                 <div class="hacking">Hacking</div>
        //                 <div class="close">
        //                     <button class="close-btn">X</button></div>
        //             </div>
        //             <div class="main">
        //                 ${e}
        //             </div>
        //         </div>`

        //    closeBtn.addEventListener("click", () => {
        //             card.style.display = "none";
        //         })

        //         body.insertAdjacentHTML("beforeend", clutter);


        //       }, 200000);


        //         })


        // }, 2000);


        // instead of using it like this what i can do is create a generate card function



        function generateCard(message, ind) {
            let clutter = `<div class="card card${ind}"  style="position: absolute; top: ${Math.random() * 1000}px; left: ${Math.random() * 1000}px;";>
           <div class="header">
                <div class="hacking">Hacking</div>
                        <div class="close">
                    <button class="close-btn close-btn${ind}">X</button></div>
            </div>
            <div class="main">
                ${message}
          </div>
         </div>`
         body.insertAdjacentHTML("beforeend", clutter);

         let closeBtn2 = document.querySelector(`.close-btn${ind}`);
         let cardDynamic = document.querySelector(`.card${ind}`)

         closeBtn2.addEventListener('click',() => {
            cardDynamic.remove();
         })
        }


            let ind = 0;
            setInterval(() => {
                generateCard(arr[ind % arr.length], ind);
                ind++;
            }, 1500);



