const { Router } = require("express");
const UserClass = require('../Controllers/User.js');

const user = new UserClass();
const router = Router();

router.post('/', user.createUser)

module.exports = router;