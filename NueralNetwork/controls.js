class Controls{
    constructor(){
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
        this.#addKeyboardListeners();
        // the #means its a private method
    }
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left  =true;
                    break;
                case "ArrowRight":
                    this.right  =true;
                    break;
                case "ArrowUp":
                    this.forward  =true;
                    break;
                case "ArrowDown":
                    this.reverse  =true;
                    break;
            }
            console.table(this);
            // console table consoles the entire object and thsi means this object
        }
         document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left  =false;
                    break;
                case "ArrowRight":
                    this.right  =false;
                    break;
                case "ArrowUp":
                    this.forward  =false;
                    break;
                case "ArrowDown":
                    this.reverse  =false;
                    break;
            }
            console.table(this)
            // console table consoles the entire object and thsi means this object

        }
    }

}