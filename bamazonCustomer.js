const mysql = require("mysql");
const inquirer = require("inquirer");

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
    // postOrBid();
})

function createItem(){
var query = connection.query("INSERT INTO products SET ?", 
    {
        item_id: 11,
        product_name: "tester",
        department_name: "bootcamp",
        price: 500,
        stock_quantity: 200
    },
    function(err, res){
        console.log("item added \n")
    })

}