const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allProducts = require("./getAllProducts.js");
const listNew = require("./listNew.js");
const register = require("./register.js");
const users = require("./user.js");
const login = require("./login.js");
const logout = require("./logout.js")
const changeUser = require("./changeUser.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/display', allProducts);
router.use('/listNew', listNew);
router.use('/register', register);
router.use('/users', users);
router.use('/login', login);
router.use('/logout', logout);
router.use('/changeUser', changeUser);

module.exports = router;
