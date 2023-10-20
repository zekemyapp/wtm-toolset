console.log("This is the featured page!")

let movie_container = document.getElementById("overview_movie_list");
let movies = movie_container.children;

for (item of movies) {
        let id = item.id.substr(3);
        let ca = item.className;

        if (ca == 'solved') {
                item.parentNode.removeChild(item);
        } else {
                console.log("shot: " + id + " / " + ca);
        }
}
