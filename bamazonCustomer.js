// dependecy for inquirer npm package
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts()
{
   console.log("The following items are available products:\n");
   connection.query("SELECT * FROM products", function(err, res)
   {
       if (err) throw err;

       console.log(res);
       runBamazon();
    })
}

function runBamazon()
{
    inquirer.prompt([
        {
            type: "number",
            message: "What is the ID of the item you would like to purchase?",
            name: "Id"
        },
        {
            type: "number",
            message: "How many units of this product would you like to buy?",
            name: "Quantity"
        }
    ])
    .then(function(response)
    {
        var itemWanted = response.Id;
        var quantityRequested = response.Quantity;
        
        purchaseItems(itemWanted, quantityRequested);
    })
    .catch(function(error)
    {
        if (error) throw error;
    })
};

function purchaseItems(ID, quantity)
{
    connection.query('SELECT * FROM products WHERE id = ' + ID, function(err, res)
    {
        if (err)
        {
            console.log(err);
        }
        else if (quantity <= res[0].stock_quantity)
        {
            var total = res[0].price * quantity;

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + " WHERE id = " + ID);

            console.log(res[0].stock_quantity);

            console.log("The total for your purchase of " + quantity + " " + res[0].product_name + " is " + total + ". Thank you for shopping with Bamazon!")
        }
        else
        {
            console.log("We do not have that many units of this item to sell you. We only have " + res[0].stock_quantity + " units available at this time.");
            readProducts();
        };
    })
}