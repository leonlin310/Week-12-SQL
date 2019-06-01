const mysql = require("mysql");
const inquirer = require("inquirer");


let shoppingCart = []
let shoppingTotal = ""

let userName = "";
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "m1ntch1p",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID: ", connection.threadId);
    createItem();
    //Step 1: create an inquirer prompt to post or bid
    showInventory()
})

function createItem() {
    var query = connection.query("INSERT INTO products SET ?",
        {
            item_id: 11,
            product_name: "tester",
            department_name: "bootcamp",
            price: 500,
            stock_quantity: 200
        },
        function (err, res) {
            console.log("item added \n")
        })
}

function showInventory() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.log("Welcome to the Bamazon Store! Below is a list of available items for sale: \n")
        console.table(res);
        //chain to BUY function
        buy();
    })
}

//TODO: The app should then prompt users with two messages.
//TODO: The first should ask them the ID of the product they would like to buy.
//TODO: The second message should ask how many units of the product they would like to buy.
function buy() {
    connection.query("SELECT * FROM products", (err, res) => {
        // console.log("This is res: \n", res)
        inquirer.prompt([
            {
                name: "product_name",
                message: "What would you like to purchase?",
                type: "list",
                choices: res.map(item => item.product_name)
            },
            {
                name: "stock_quantity",
                message: "How much would you like to buy?"
            }])
        .then(answers => {
            // console.log("User choice answers: \n", answers)
            let productChosen = res.find(item => item.product_name == answers.product_name)
            // console.log("This is Product Chosen ========= \n", productChosen)
            if (productChosen.stock_quantity >= answers.stock_quantity){
                let newInventory = productChosen.stock_quantity - answers.stock_quantity
                let itemTotal = productChosen.price * answers.stock_quantity
                shoppingCart.push(itemTotal);
                shoppingTotal = shoppingCart.reduce(getSum)
                console.log(`You bought ${answers.stock_quantity} ${productChosen.product_name}'s for a total of $${itemTotal}`)
                // console.log("The current inventory after this purchase is", newInventory);
                // console.log("Current shopping cart array is: ", shoppingCart + "\n Current total is: ", shoppingTotal)
                
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newInventory}, {item_id: productChosen.item_id}], (err, res) => {
                    console.log("Your order has been processed. Would you like to purchase anything else? \n")
                    inquirer.prompt([
                        {
                            name: "choice",
                            message:"Would you like to purchase another item?",
                            type: "list",
                            choices: ["Yes", "No, I would like my total" ]
                        }
                    ])
                    .then(answers => {
                        // console.log(answers) 
                        if (answers.choice == "Yes"){
                            buy();
                        }

                        else {
                            console.log(`Thank you for shopping with bamazon! The cheap knock off of Amazon! Your total for today is $${shoppingTotal}. You may pay with cash, credit, or bitcoin!`)
                        }
                    })

                    
                })
            }

            else {
                console.log("There is insufficient quantity! Would you like to continue shopping, or check out? \n" )
                inquirer.prompt([
                    {
                        name: "choice",
                        message: "There is insufficient quantity! Would you like to purchase another item?",
                        type: "list",
                        choices: ["I would like to purchase another item", "No, I would like my total"]
                    }
                ])
                .then(answers => {
                    // console.log(answers) 
                    if (answers.choice == "Yes"){
                        buy();
                    }

                    else {
                        console.log(`Thank you for shopping with bamazon! The cheap knock off of Amazon! Your total for today is $${shoppingTotal}. You may pay with cash, credit, or bitcoin!`)
                    }
                })
            }
        })

    })
}

// TODO: Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// TODO: This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function subtractor(oldInv, purchaseQuantity){
 return oldInv - purchaseQuantity
}

function getSum(total, num) {
    return total + num;
  }
  
  