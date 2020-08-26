require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nightmare = require("nightmare")();

const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

checkPrice();

async function checkPrice() {
  try {
    const priceString = await nightmare
      .goto(url)
      .wait("#priceblock_ourprice")
      .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
      .end();

    const priceNumber = parseFloat(priceString.replace("$", ""));
    if (priceNumber < minPrice) {
      await sendEmail(
        "Price is low",
        `The price on ${url} has dropped below ${minPrice}`
      );
    }
  } catch (error) {
    await sendEmail("Amazon Price Checker Error", error.message);
    throw error;
  }
}

function sendEmail(subject, body) {
  const email = {
    to: "vixah57553@bpghmag.com",
    from: "amazon-price-checker@amazon.com",
    subject: subject,
    text: body,
    html: body,
  };

  return sgMail.send(email);
}
