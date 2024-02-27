// // authenticationMiddleware.js
// const {User} = require('./models/index.js');
// const bcrypt = require('bcryptjs')


// function authenticate(req, res, next) {
//   const { username, password } = req.body;

//   User.findOne({ where: { username: username } })
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         req.session.user = user;
//         return next();
//       } else {
//         res.send('Invalid username or password');
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     });
// }

// module.exports = authenticate;