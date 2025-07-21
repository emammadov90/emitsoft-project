const bcrypt = require('bcrypt');

const plainPassword = 'IllinoisTech@2025';

bcrypt.hash(plainPassword, 10, function(err, hash) {
  if (err) return console.error(err);
  console.log('Generated Hash:', hash);
});