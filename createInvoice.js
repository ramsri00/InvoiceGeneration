const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("lexcorp.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Lex Corp", 110, 57)
    .fontSize(10)
    .text("Lex Corp", 200, 50, { align: "right" })
    .text("10880,malibu point", 200, 65, { align: "right" })
    .text("California 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Final Total:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal + invoice.subtotal*0.18),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Sno",
    "Item",
    "Quantity",
    "Cost",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i+1) * 30;
    generateTableRow(
      doc,
      position,
      item.Sno,
      item.Item,
      item.Quantity,
      item.Cost,
      // item.amount,
      // formatCurrency(item.amount / item.quantity),
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const calculateGstPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    calculateGstPosition,
    "",
    "",
    "GST(CGST 9% + SGST 9%)",
    "",
    "18%"
    // formatCurrency(invoice.paid)
  );

  const finalTotalPosition = calculateGstPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    finalTotalPosition,
    "",
    "",
    "Final Total",
    "",
    formatCurrency(invoice.subtotal + invoice.subtotal*0.18)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  Sno,
  Item,
  Quantity,
  Cost,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(Sno, 50, y)
    .text(Item, 150, y)
    .text(Quantity, 280, y, { width: 90, align: "right" })
    .text(Cost, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(rupees) {
  return "Rs. " + (rupees);    //.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
