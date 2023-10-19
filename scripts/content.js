console.log("This is the random page!")
document.execCommand("Stop");

function empty(element) {
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}


let parent = document.getElementsByTagName("body");
empty(parent);