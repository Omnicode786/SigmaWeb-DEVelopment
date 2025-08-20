alert("This js is loades from public")

        let number = document.querySelector(".noofjokes");
        let joke_content = document.querySelector(".jokecontent");

        async function getJoke(){
            let response  = await fetch('/jokes');
            let data = await response.json();
                number.innerHTML = `Total Jokes: ${data.length}`;
            console.log(data);
            joke_content.innerHTML = ""
            joke_content.innerHTML = data.map((joke,index) => {
                    return `The id is:${joke.id} and the joke is that ${joke.content}`
            }).join(" ");
        }


        getJoke();