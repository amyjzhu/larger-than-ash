// ignore this line; omitting it causes TS errors
exports = 0;

import * as http from 'http';

let ASH_HEIGHT = 16.8; // 10cm units
let ASH_WEIGHT = 430; // 100g units


let field = document.getElementById("pokemon");
let button = document.getElementById("submit");

button.onclick = function() {


    // retrieves pokemon_name after something has been entered into the field
    let pokemon_name : string = (<HTMLInputElement>field).value;
    display("Searching " + pokemon_name + "...");

    if (/^\s*&/.test(pokemon_name)) {
        display("Please enter an input into the text field!");
    }

    // retrieve Pokemon information from pokeapi.co
    let base_string = "http://pokeapi.co/api/v2/pokemon/";
    let query = base_string + pokemon_name.toLowerCase();

    let exists : boolean = false;
    let result : any = {};
    http.get(query, (res : any) => {

        const { statusCode } = res;
        if (statusCode !== 200) {
            display ("Sorry, that Pokemon doesn't seem to exist!");
            return;
        }

        let data : string = '';
        res.on('data', (chunk : string) => { data += chunk; });

        res.on('end', () => {
            try {
                let parsedData = JSON.parse(data);
                result = parsedData;

                // parse Pokemon data to get height and weight
                // then decide if Ash is bigger
                if (result !== {}) {
                    let h : number = <number> result["height"];
                    let w : number = <number> result["weight"];
                    let n : string = <string> result["name"];

                    let isLargerThanAsh = false;
                    isLargerThanAsh = (h > ASH_HEIGHT && w > ASH_WEIGHT);
                    console.log(h + " " + w);

                    let name = n.charAt(0).toUpperCase() + n.slice(1);

                    display(name + " is " + ((isLargerThanAsh) ?  "larger" : "not larger") + " than Ash!");
                }

            } catch (e) {
                console.error(e.message);
            }
        });

        res.on('error', (err : any) => {
            display("Whoa");
        })

        }

    );





};

function display(res : string) {
    document.getElementById("response").innerHTML = res;
}
