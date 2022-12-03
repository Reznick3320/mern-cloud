const Router = require('express');
const { check } = require('express-validator');

const controller = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post('/registration',
	[
		check('email', "Имя пользователя не может быть пустым").isEmail(),
		check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 3, max: 10 })
	],
	controller.registration);

router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.auth)


module.exports = router;