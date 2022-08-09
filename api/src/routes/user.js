const { Router } = require("express");
const UserClass = require('../Controllers/User.js');

const user = new UserClass();
const router = Router();

router.get('/all', user.getAllUsers)
router.get('/profileInfo', user.getProfileInfo);
router.get('/profileInfoToken', user.getProfileInfoToken);
router.get("/getPhotoUser", user.getPhotoUser);
router.post('/editProfileInfo', user.editionBasicDataProfile)

module.exports = router;