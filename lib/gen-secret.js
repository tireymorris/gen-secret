const openssl = require("openssl-nodejs");

function gen_secret() {
  openssl("rand -hex 32", (err, result) => {
    err.length > 0 ? console.log(err) : console.log(result.toString());
  });
}

module.exports = { gen_secret };
