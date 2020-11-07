var express = require('express');
var router = express.Router();
var [getUsers, insertUser] = require('../controllers/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await getUsers();
  console.warn('users->', users);
  res.send(users);
});

/**
 * POST user
 */
router.post('/', async function (req, res, next) {
  const newUser = await insertUser(req.body);
  console.warn('insert user->', newUser);
  res.send(newUser);
});


module.exports = router;
