const nightmare = require("nightmare")();

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto(
      "https://www.amazon.com/Samsung-T5-Portable-SSD-MU-PA2T0B/dp/B073H4GPLQ"
    )
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));
  console.log(priceNumber);
}
