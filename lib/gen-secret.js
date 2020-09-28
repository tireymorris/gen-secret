const openssl = require('openssl-nodejs');
const { argv } = require('yargs');

const allowedOptions = ['h', 'b', 'bytes', 'hex', 'base64'];

function gen_secret() {
  const seenKeys = Object.keys(argv).filter(
    (key) => !['_', '$0'].includes(key)
  );

  if (argv.h) {
    console.log(`
-b, --bytes : change number of bytes (default is 32)
--hex: generate hex digits instead of base64
    `);
    return;
  } else if (seenKeys.some((key) => !allowedOptions.includes(key))) {
    console.error(
      `Unsupported option ${seenKeys.find(
        (key) => !allowedOptions.includes(key)
      )}`
    );
    return;
  }

  openssl(
    `rand -${argv.hex ? 'hex' : 'base64'} ${argv.b || argv.bytes || 32}`,
    (err, result) => {
      err.length > 0 ? console.log(err) : console.log(result.toString());
    }
  );
}

module.exports = { gen_secret };
