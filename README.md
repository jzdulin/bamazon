# bamazon

Bamazon is an Amazon-like storefront that uses a MySQL database to take orders from customers and deplete the stock from the stores inventory.

When using bamazonCustomer.js the user will be shown all the items that are in stock and then asked which item they would like to buy and how much. It will show the customer how much money their order costs. If they pick an item ID that is not listed it will ask them to please select a valid item. If the user tries to order more than the store has it will alert the user and won't allow the order to go through.
Whenever the command completes it will ask the user if they would like to buy anything else. If the user hits yes it will give ask them what they want to buy and how much again and if they hit no it will end the connection.

A sample of using bamazonCustomer:

![Alt text](/bamazonCustomer.png?raw=true "Bamazon Customer Screenshot")

The bamazon Manager.js has 4 options:

View Products for sale will list all of the items, just like bamazonCustomer.js, but also shows the stock.
View Low Inventory shows all items that have a stock that is less than 5.
Add to Inventory allows for the user to add stock to any of the items.
Add New Product allows the user to put a new product into the store and lets them set the department, price, and initial stock.
Whenever a command completes it will ask the user if they would like to do anything else. If the user hits yes it will give them all the options again and if they hit no it will end the connection.

A sample of using bamazonManager:

![Alt text](/bamazonManager.png?raw=true "Bamazon Manager Screenshot")

