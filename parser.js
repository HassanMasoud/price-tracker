require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nightmare = require("nightmare")();

const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < minPrice) {
    console.log("It's cheap");
  } else {
    console.log("It's expensive");
  }
}
