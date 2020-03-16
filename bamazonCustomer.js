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
       if (err) throw err;;

       console.log(res);
       connection.end()
   })
}