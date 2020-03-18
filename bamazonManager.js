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

connection.connect(function (err)
{
    if (err) throw err;
    console.log ("connected as id " + connection.threadId + "\n");
    managerOptions();
});

function managerOptions()
{
    inquirer.prompt([
        {
            type: "list",
            message: "What action would you like to perform?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerOptions"
        }
    ])
    .then(function(response)
    {
        if(response === "View Products for Sale")
        {
            readProducts();
        }
        else if (response === "View Low Inventory")
        {
            lowInventory();
        }
        else if (response === "Add to Inventory")
        {
            addInventory();
        }
        else if (response === "Add New Product")
        {
            addNewProduct();
        }
    })
    .catch(function(err)
    {
        if(error) throw error;
    })
};

function readProducts()
{
    console.log("The following items are available products:\n");
    connection.query("SELECT * FROM products", function(err, res)
    {
        if (err) throw err;

        console.log(res);
    })
}

function lowInventory()
{
    console.log("The following are items that have low inventory.\n");
    connection.query("SELECT * FROM products WHERE stock_quantity IN (SELECT stock_quantity FROM products GROUP BY stock_quantity HAVING stock_quantity < 6) ORDER BY id");
}

function addInventory()
{
    inquirer.prompt([
        {
            
        }
    ])
}

function addNewProduct()
{
    console.log("Add a new Product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: "New Product",
            department_name:"Health & Makeup",
            price: 7.50,
            stock_quantity: 30
        },
        function(err, res)
        {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        }
    );
    console.log(query.sql);
}