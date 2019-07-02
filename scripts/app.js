document.addEventListener("DOMContentLoaded", function(event) {
    
    var view = {
        displayMessage: function(msg) {
            var messegeArea = document.getElementById('messageArea');
            messageArea.innerHTML = msg;
        },
        displayHit: function(location) {
            var cell = document.getElementById(location);
            cell.setAttribute('class', 'hit');
        },
        displayMiss: function(location) {
            var cell = document.getElementById(location);
            cell.setAttribute('class', 'miss');
        }
    }

    var model = {
        boardSize: 7,
        numShips: 3,
        shipLength: 3,
        shipsSunk: 0,

        ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }
        ],

        fire: function(guess) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = this.ships[i];
                var index = ship.locations.indexOf(guess);

                if (index >= 0) {
                    ship.hits[index] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("TRAFIONY!");
                    if (this.isSunk(ship)) {
                        view.displayMessage("ZATOPIŁEŚ MÓJ OKRĘT!");
                        this.shipsSunk++;
                    }
                    return true;
                }
            }
            view.displayMiss(guess);
            view.displayMessage('Spudłowałeś!');
            return false;
        },

        isSunk: function(ship) {
            for (var i = 0; i < this.shipLength; i++) {
                if (ship.hits[i] !== "hit") {
                    return false;
                }
            }
            return true;
        },

        generateShipLocations: function () {
            var locations;
            for (var i = 0; i < this.numShips; i++) {
                do {
                    locations = this.generateShip();
                } while (this.collision(locations));
                this.ships[i].locations = locations;
            }
        },

        generateShip: function () {
            var direction = Math.floor(Math.random() * 2);
            var row, col;
            if (direction === 1) {
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * this.boardSize - this.shipLength);
            } else {
                row = Math.floor(Math.random() * this.boardSize - this.shipLength);
                col = Math.floor(Math.random() * this.boardSize);
            }

            var newShipLocations = [];
            for (var i = 0; i < this.shipLength; i++) {
               if (direction === 1) {
                   newShipLocations.push(row + "" + (col + i));
                } else {
                   newShipLocations.push((row + i) + "" + col);
                } 
            }
            return newShipLocations;
        },

        collision: function (lcations) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = model.ships[i];
                for (var j = 0; j < locations.length; j++) {
                    if (ship.locations.indexOf(locations[j]) >= 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    function parseGuess(guess) {
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        if (guess === null || guess.length !== 2) {
            alert('Ups, proszę wpisać literę i cyfrę.');
        } else {
            firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);

            if (isNaN(row) || isNaN(column)) {
                alert('Ups, to nie są współrzędne!');
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert('Ups, pole poza planszą!');
            } else {
                return row + column
            }
        }
        return null
    }

    var controller = {
        guesses: 0,

        processGuess: function(guess) {
            var location = parseGuess(guess);
            if (location) {
                this.guesses++;
                var hit = model.fire(location);
                if (hit && model.shipsSunk === model.numShips) {
                    view.displayMessage('ZATOPIŁEŚ WSZYSTKIE MOJE OKRĘTY W ' + this.guesses + ' PRÓBACH');
                }
            }
        }
    }

    function init () {
        var fireButton = document.getElementById('fireButton');
        fireButton.onclick = handleFireButton;
    }

    function handleFireButton () {
        var guessInput = document.getElementById('guessInput');
        var guess = guessInput.value;
    }

    window.onload = init;


});

// WERSJA DEMO

// document.addEventListener("DOMContentLoaded", function (event) {
//     var randomLoc = Math.floor(Math.random() * 5);
//     var location1 = randomLoc;
//     var location2 = location1 + 1;
//     var location3 = location2 + 2;
//     var guess;
//     var hits = 0;
//     var guesses = 0;
//     var isSunk = false;

//     while (isSunk == false) {
//         guess = prompt("Gotów, cel, pal! (Podaj liczbę z zakresu 0-6):");

//         if (guess < 0 || guess > 6) {
//             alert("Proszę podać prawidłowy numer komórki!");
//         } else {
//             guesses += 1;
//         }

//         if (guess == location1 || guess == location2 || guess == location3) {
//             alert('TRAFIONY');
//             hits += 1;

//             if (hits == 3) {
//                 isSunk = true;
//                 alert("Zatopiłeś mój okręt!");
//             }
//         } else {
//             alert("PUDŁO");
//         }
//     }

//     var stats = "Potrzebowałeś " + guesses + " prób, by zatopić okręt, " + "czyli Twoja efektywność wynosi: " + (3 / guess) + ".";
//     alert(stats);
// });