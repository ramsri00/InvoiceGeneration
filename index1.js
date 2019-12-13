const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var pdf = require("pdf-creator-node");
var fs = require('fs')

//var html = fs.readFileSync('template.html', 'utf8');
const { createInvoice } = require("./createInvoice.js");


app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

app.get('',async(req,res) => {




  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
 };


var users = [
    {
        name:"Shyam",
        age:"26",
        invoice:{
            shipping: {
                name: "Shyam",
                address: "no45,1st cross main road,alandur",
                city: "chennai",
                state: "Tamil Nadu",
                country: "India",
                postal_code: 600-090
              },
              items: [
                {
                  Sno: "01",
                  Item: "PlayStation",
                  Quantity: 2,
                  amount: 6000,
                  Cost:3000
                },
                {
                  Sno: "02",
                  Item: "Laptop",
                  Quantity: 2,
                  amount: 8000,
                  Cost:4000
                }, {
                  Sno: "03",
                  Item: "Iphone 11 pro",
                  Quantity: 1,
                  amount: 98000,
                  Cost:98000
                },
                {
                  Sno: "04",
                  Item: "Ipod",
                  Quantity: 1,
                  amount: 23000,
                  Cost:23000
                },
            
            
              ],
             // subtotal: 122000,
              paid: ("18%"),
              invoice_nr: 001
        }
    },
    {
        name:"Richard Jebasingh",
        age:"30",
        invoice:{
            shipping: {
                name: "Richard Jebasingh",
                address: "393,12th Main Street,Tambram",
                city: "Chennai",
                state: "Tamil Nadu",
                country: "India",
                postal_code: 600-143
              },
              items: [
                {
                  Sno: "01",
                  Item: "Macbook Pro 15inch",
                  Quantity: 2,
                  amount: 430000,
                  Cost:215000,
                },
                {
                  Sno: "02",
                  Item: "Grill Chicken",
                  Quantity: 2,
                  amount: 760,
                  Cost:380
                }, {
                  Sno: "03",
                  Item: "Samsung galaxy note 10+",
                  Quantity: 1,
                  amount: 76000,
                  Cost:76000
                },
                {
                  Sno: "04",
                  Item: "Ipod",
                  Quantity: 1,
                  amount: 23000,
                  Cost:23000
                },
            
            
              ],
             // subtotal: 122000,
              paid: ("18%"),
              invoice_nr: 002
        }
    },
    {
        name:"Vijay",
        age:"34",
        invoice:{
            shipping: {
                name: "Vijay",
                address: "15th Main Road",
                city: "Medavkkam,chennai",
                state: "Tamil NadU",
                country: "India",
                postal_code: 617-268
              },
              items: [
                {
                  Sno: "01",
                  Item: "LEICA S Typ007",
                  Quantity: 1,
                  amount: 1292560,
                  Cost:1292560
                },
                {
                  Sno: "02",
                  Item: "Rolex Watch",
                  Quantity: 2,
                  amount: 8000,
                  Cost:4000
                }, {
                  Sno: "03",
                  Item: "Iphone 11 pro",
                  Quantity: 1,
                  amount: 98000,
                  Cost:98000
                },
                {
                  Sno: "04",
                  Item: "Sony Ps4",
                  Quantity: 1,
                  amount: 26786,
                  Cost:26786
                },
            
            
              ],
             // subtotal: 122000,
              paid: ("18%"),
              invoice_nr: 003
        }
    },
    {
        name:"issac",
        age:"34",
        invoice:{
            shipping: {
                name: "issac",
                address: "2nd cross,Royapuram",
                city: "Chennai",
                state: "Tamil Nadu",
                country: "India",
                postal_code: 602-901
              },
              items: [
                {
                  Sno: "01",
                  Item: "Iphone XR",
                  Quantity: 1,
                  amount: 76230,
                  Cost:76230
                },
                {
                  Sno: "02",
                  Item: "MacBook pro 13 inch",
                  Quantity: 1,
                  amount: 113245,
                  Cost:113245
                }, {
                  Sno: "03",
                  Item: "Reymond black suit",
                  Quantity: 1,
                  amount: 17899,
                  Cost:17899
                },
                {
                  Sno: "04",
                  Item: "Ipod",
                  Quantity: 2,
                  amount: 46000,
                  Cost:46000
                },
            
            
              ],
             // subtotal: 122000,
              paid: ("18%"),
              invoice_nr: 004
        }
    }
]


for(i in users){
    var total = 0;
    for (var prop in users[i].invoice.items) {
    total += users[i].invoice.items[prop].amount;

    }
    users[i].invoice.subtotal=total;
    createInvoice(users[i].invoice, users[i].name+"-output-invoice.pdf");
    
}



}); 

    app.use(cors());

    const server = app.listen(4200, function() {
      let host = server.address().address;
      let port = server.address().port;
    
      console.log('App listening at http://%s:%s', host, port);
    });
    