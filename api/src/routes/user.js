const { Router } = require("express");
const UserClass = require('../Controllers/User.js');

const user = new UserClass();
const router = Router();

router.get('/all', user.getAllUsers)
router.get('/profileInfo', user.getProfileInfo)
router.post('/editProfileInfo', user.editionBasicDataProfile)

module.exports = router;