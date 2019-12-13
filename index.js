const { createInvoice } = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "Tony Stark",
    address: "12th Main Street",
    city: "San Francisco",
    state: "Los Angels",
    country: "US",
    postal_code: 283829
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
};

var total = 0;
for (var prop in invoice.items) {
total += invoice.items[prop].amount;

}
invoice.subtotal=total;
createInvoice(invoice, "invoice.pdf");
