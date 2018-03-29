var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price);
        }
        // connection.end();
        runSearch();
    });
}

// var itemArray = [];
// var listOfItems = function () {
//     connection.query('SELECT * FROM products' ,function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//             itemArray.push(res[i].product_name);
//         }
//     })
// };
// listOfItems ();
// console.log(itemArray);

function runSearch() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                //   name: "choice",
                //   type: "rawlist",
                //   choices: itemArray,
                //   function() {
                //     var choiceArray = [];
                //     for (var i = 0; i < results.length; i++) {
                //       choiceArray.push(results[i].id);
                //     }
                //     return choiceArray;
                //   },
                name: "choice",
                type: "input",
                message: "What is the ID number for the item you would like to purchase?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].id === parseInt(answer.choice)) {
                        chosenItem = results[i];
                    }
                }
                if (chosenItem === undefined) {
                    runSearch();
                    return console.log("------------------------\nPlease select a valid ID\n------------------------")
                }

                if (chosenItem.stock_quantity > parseInt(answer.amount)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenItem.stock_quantity - answer.amount)
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Order placed successfully!");
                            total = answer.amount * chosenItem.price;
                            console.log("Your total is $" + total + " !");
                        }
                    );
                }
                else {
                    start();
                    return console.log("Insufficient quantity!");
                }
            });
    });
}


