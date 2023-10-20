console.log("This is the featured page!")

let movie_container = document.getElementById("overview_movie_list");
let movies = movie_container.children;

var parser = new DOMParser();
var to_remove = []
var waiting_for = 0;

function httpGetAsync(shot, item, callback)
{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(item, xmlHttp.responseText);
        }
        xmlHttp.open("GET", 'https://whatthemovie.com/shot/' + shot, true); // true for asynchronous 
        xmlHttp.send(null);
}

function try_remove()
{
        if (waiting_for > 0)
                return;

        for (item of to_remove) {
                item.parentElement.removeChild(item);
        }
}

for (item of movies) {
        let id = item.id.substr(3);
        let ca = item.className;

        var parser = new DOMParser();

        if (ca == 'solved') {
                console.log(id + " removing");
                to_remove.push(item);
        } else {
                console.log("shot: " + id + " / " + ca);
                waiting_for += 1
                httpGetAsync(id, item, function(item, response) {
                        console.log(id + " responded");
                        waiting_for -= 1
                        let doc = parser.parseFromString(response, "text/html");
                        let infos = doc.getElementById("shotinfos");
                        let status = infos.children[1].innerHTML;

                        if (status == 'status: unsolved') {
                                to_remove.push(item);
                                console.log(id + " status: unsolved");
                        } else {
                                var num_solved = status.substring(
                                        status.indexOf("(") + 1, 
                                        status.lastIndexOf(")")
                                );

                                console.log(id + " status: solved by " + num_solved);
                                if (num_solved < 100) {
                                        to_remove.push(item);
                                }
                        }

                        try_remove();
                })
        }
}