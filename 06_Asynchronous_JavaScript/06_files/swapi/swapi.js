// https://swapi.co/documentation

// #region Setup
const URL = "http://swapi.dev/api/";
const output = document.getElementById("output");
const spinner = document.getElementById('spinner');

output.innerHTML = "Loading ...";
//#endregion

fetch(URL + "films")
    .then(response => {
        return response.json();
    }).then(  => console.log(data))

