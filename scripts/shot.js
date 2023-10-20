console.log("This is the shot page!");
// Not used

function generate_random_shot(text) {
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.replace(/\s/g, '');

    let difficulty = ""

    switch(text) {
        case 'randomeasyshot':
            difficulty = "easy";
            break;
        case 'randommediumshot':
            difficulty = "medium";
            break;
        case 'randomhardshot':
            difficulty = "hard";
            break;
        case 'randomshot':
            difficulty = "any";
            break;
    }

    console.log("requested difficulty: " + difficulty);
}

const shot = document.URL.substring(document.URL.lastIndexOf('/')+1);
console.log("Shot: " + shot)


let random_container = document.getElementById("randombutton_container");
let random_button = document.getElementById("random_aw_button");

let newItem = document.createElement('li');
newItem.className = "skip";
newItem.innerHTML = '<a accesskey="0" id="random_aw_button">random shot</a>';
newItem.addEventListener("click", function call_random(){
    generate_random_shot(random_button.innerHTML);
});

random_container.parentNode.replaceChild(newItem, random_container);
console.log("replaced random buttom");