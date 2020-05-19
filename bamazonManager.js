var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start(){
    /*have user select from list.  Then use a 
    switch to pick which function is run
    set up your connection queries inside of those functions
     */
    inquirer.prompt([
        {
            name: "task",
            type: "rawlist",
            choices: [`View Products for Sale`,`View Low Inventory`,`Add to Inventory`,`Add New Product`, `Exit`],
            message: "Good day Manager: What would you like to do?"
        }
    ])
    .then(function(choice){
        var task = choice.task;
        console.log(task);
        switch(task) {
            case `View Products for Sale`:
                viewProducts();
                break;
            case `View Low Inventory`:
                lowInventory();
                break;
            case `Add to Inventory`:
                addInventory();
                break;
            case `Add New Product`:
                addNewProduct();
                break;
            case `Exit`:
                console.log(`Have a nice day`)
                break;
            default:
                console.log("Not even sure how this is possible...");
                //start()
                break;
        }
    });
}
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(`Items currently in inventory`)
        for (i in results){
            console.log(`Item ID: ${results[i].item_id}
            product_name: ${results[i].product_name}
            department_name: ${results[i].department_name}
            price: $${results[i].price}
            stock_quantity: ${results[i].stock_quantity}\n`)
        };
        start();
    });
};
function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, results) {
        if (err) throw err;
        console.log(`Items with low inventory`)
        for (i in results){
            console.log(`Item ID: ${results[i].item_id}
            product_name: ${results[i].product_name}
            department_name: ${results[i].department_name}
            price: $${results[i].price}
            stock_quantity: ${results[i].stock_quantity}\n`)
        };
        start();
    });
};
function addInventory(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(`Add items to inventory`) 
        inquirer
          .prompt([
            {
                name: "select",
                type: "rawlist",
                choices: function() {
                  var choiceArray = [];
                  for (i in results) {
                  choiceArray.push(results[i].product_name);
                  };
                  return choiceArray;
                },
                message: "Which item would you like to restock?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to add to the inventory?"
            }
        ]).then(function(restock){
            var chosenRestock;
            for (i in results){
                if (results[i].product_name === restock.select) {
                    chosenRestock = results[i];
                }
            }
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: chosenRestock.stock_quantity + parseInt(restock.amount)
                },
                {
                    item_id: chosenRestock.item_id
                }
                ],
                function(error) {
                if (error) throw err;
                console.log("Restock successfully!");
                }
            );
            start();
        })
    });
}
function addNewProduct(){
    console.log(`Adding a new item.`);
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "New product name?"
        },
        {
            name: "department_name",
            type: "input",
            message: "New product department?"
        },
        {
            name: "price",
            type: "input",
            message: "New product price?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "New product initial stock?"
        }
    ]).then(function(newProduct){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: newProduct.product_name,
                department_name: newProduct.department_name,
                price: newProduct.price,
                stock_quantity: newProduct.stock_quantity
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
              viewProducts();
            }
          );
    })
}