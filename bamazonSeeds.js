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
  console.log("connected as id " + connection.threadId + "\n");
});

var seedproducts = [
    ["Mallard Decoys/1doz","Sporting Goods",35.50, 20],
    ["Wood Duck Decoys/1doz","Sporting Goods",30.00, 10],
    ["Blue Bill Decoys/1doz", "Sporting Goods",45.00, 10],
    ["Sparky's Duck Call","Sporting Goods",25.00, 5],
    ["Call of Duty 35, Mongal Horde", "Electronics", 55.00, 15],
    ["iPhone 11","Electronics",775.00,5],
    [
        "Columbia Rain Suit",
         "Apparel",
         125.00,
         5
    ],
    [
        "Hiking Pants",
         "Apparel",
         45.00,
         15
    ],
    [
        "Hiking Boots",
         "Apparel",
         95.00,
         5
    ],
    [
        "Hiking Tech Shirt",
         "Apparel",
         65.00,
         10
    ]
]
var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";

function createSeeds() {
    console.log("Inserting a new product...\n");
    var query = connection.query(sql, [seedproducts],function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
      }
    );
  console.log(query.sql);
}

createSeeds()