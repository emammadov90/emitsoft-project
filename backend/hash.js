const bcrypt = require('bcrypt');

const password = 'IllinoisTech@2025';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Hashing error:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
