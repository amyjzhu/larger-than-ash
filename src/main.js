"use strict";
// ignore this line; omitting it causes TS errors
exports = 0;
let ASH_HEIGHT = 16.8; // 10cm units
let ASH_WEIGHT = 430; // 100g units
let field = document.getElementById("pokemon");
let button = document.getElementById("submit");
function findPokemon() {
    try {
        let result = getPokemonInfo(getInput());
        displayResults(result);
    }
    catch (e) {
        display(e);
    }
}
function getInput() {
    // retrieves pokemon_name after something has been entered into the field
    let pokemon_name = field.value;
    display("Searching " + pokemon_name + "...");
    if (/^\s*&/.test(pokemon_name)) {
        display("Please enter an input into the text field!");
    }
    // prepare query on pokeapi
    let base_string = "http://pokeapi.co/api/v2/pokemon/";
    let query = base_string + pokemon_name.toLowerCase();
    return query;
}
function getPokemonInfo(query) {
    let exists = false;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', query, false);
    xhr.send(null);
    if (xhr.status !== 200) {
        throw ("Sorry, that Pokemon doesn't seem to exist!");
    }
    else {
        return xhr.responseText;
    }
}
function displayResults(data) {
    let result = {};
    try {
        let parsedData = JSON.parse(data);
        result = parsedData;
        // parse Pokemon data to get height and weight
        // then decide if Ash is bigger
        if (result !== {}) {
            let h = result["height"];
            let w = result["weight"];
            let n = result["name"];
            let isLargerThanAsh = false;
            isLargerThanAsh = (h > ASH_HEIGHT && w > ASH_WEIGHT);
            let name = capitalize(n);
            // display results
            display(name + " is " + ((isLargerThanAsh) ? "larger" : "not larger") + " than Ash!");
            return isLargerThanAsh;
        }
    }
    catch (e) {
        console.error(e.message);
    }
    return false;
}
function capitalize(n) {
    return n.charAt(0).toUpperCase() + n.slice(1);
}
function display(res) {
    document.getElementById("response").innerHTML = res;
}
button.onclick = findPokemon;
