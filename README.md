# Bamazon
Like Amazon, but with an sql database, and node.js

This repo contains two node.js apps for running an online store.

bamazonCustomer: Allows a customer to select items from the bamazon mysql inventory database in which to purchase.  They can then decide on how much they wish to purchase, and that amount will be deducted from the inventory storied in the mysql database.  First the customer is shown a list of available items, with the products name, department, price, and available quntity.  Then they are asked to choose which item they would like to purchase from a raw list inquirer selection.  Then a inquirer input askes them how many they would like to purchase.  They are either told that the purchase went through, or in the case that they ask for more items then are in the inventory, they are told that the order can not be completed and are asked to start the purchase process again.
![Image description](https://github.com/Topduck/Bamazon/blob/master/assets/images/bamazonCustomer%20startup.PNG)
![Image description](https://github.com/Topduck/Bamazon/blob/master/assets/images/bamazonCustomer%20order%20success.PNG)
![Image description](https://github.com/Topduck/Bamazon/blob/master/assets/images/bamazonCustomer%20reduced%20stock.PNG)
![Image description](https://github.com/Topduck/Bamazon/blob/master/images/Do_What_It_Says.PNG)

bamazonManager: This app allows a manager to check which items are in the database, check which are low in stock, add more inventory to pre-existing items, and add new items to the inventory.
The viewProducts function lists the items in the inventory with their name, department, price, and stock.  
The lowInventory function, does the same function as the viewProducts function, except it only displays items with 5 or less left in stock.
addInventory allows a manager to select an item from inventory and add more stock to it, using a inquirer raw list and an amount input.
addNewProduct uses inquirer inputs to gather the name, departmet, price, and initial stock of a new item and add it to the mysql bamazon database.
These functions are selected by the manager via a inquirer rawlist provided when the app is launched.

