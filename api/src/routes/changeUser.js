const {Router} = require('express');
const User = require('../Controllers/User.js');

const router = Router();
const user = new User();

router.post('/toCompany', user.changeUserToCompany);
router.post('/toStandard', user.changeUserToStandard);

module.exports = router;