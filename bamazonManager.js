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
    search();
});

function search() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    productSearch();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}

function productSearch() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price + "|| Quantity: " + res[i].stock_quantity);
        }
        goAgain();
    });
}

function lowInventory() {
    console.log("Selecting low inventory products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price + "|| Quantity: " + res[i].stock_quantity);
            }
        }
        goAgain();

    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the ID number for the item you would like to add more of?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to add?"
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

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (+chosenItem.stock_quantity + +answer.amount)
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Stock successfully updated!");
                        goAgain();
                    }
                );
            })
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item you would like to submit?"
        },
        {
            name: "department",
            type: "input",
            message: "Which department does your item belong in?"
        },
        {
            name: "price",
            type: "input",
            message: "What would you like the price to be?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How many would you like to have in stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {

            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product has been successfully added!");
                    goAgain();
                }
            );
        });
}

function goAgain() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to do something else?",
        choices: [
            "Yes",
            "No",
        ]
    })
        .then(function (answer) {
            if (answer.action === "Yes") {
                search()
            }
            else {
                connection.end();
            }
        })
}