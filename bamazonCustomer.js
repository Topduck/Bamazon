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
start()

function start(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        console.log(`Welcome to Bamazon! \n
        Here are the items available!`)
        for (i in results){
            console.log(`Item ID: ${results[i].item_id}
            product_name: ${results[i].product_name}
            department_name: ${results[i].department_name}
            price: $${results[i].price}
            stock_quantity: ${results[i].stock_quantity}\n`)
        };
            
        inquirer
          .prompt([
              {
                  name: "select",
                  type: "rawlist",
                  choices: function() {
                    var choiceArray = [];
                    //results.forEach(function(i){
                    for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                    };
                    return choiceArray;
                  },
                  message: "Which item would you like to buy?"
              },
        {
          name: "amount",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function(selection){
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
        //results.forEach(function(i){  How can I use a better for loop?
        //I know it has to do with callback's and promises.
            if (results[i].product_name === selection.select) {
              chosenProduct = results[i];
            }
            //console.log(chosenProduct);
          }
          //console.log(stock_quantity);
          if (chosenProduct.stock_quantity >= parseInt(selection.amount)){
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: chosenProduct.stock_quantity - parseInt(selection.amount)
                  },
                  
                  {
                    item_id: chosenProduct.item_id
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Order was placed successfully!");
                  start();
                }
              );
              
          }else {
            // Not enough product to fill order. apologize and start over
            console.log(`Sorry! we only have ${chosenProduct.stock_quantity} of ${chosenProduct.product_name}.
            Please select again`);
          }
          start();
        });
          //get info from server, then check if there is enough of that item
          //to complete order. if not tell user, and head back to start
          //if so, subtract from total in db, and send user back to start
      });
    }
