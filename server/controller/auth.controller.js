const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');



const User = require("../models/User");
const fileService = require('../services/fileService');
const File = require('../models/File');

class authController {
	async registration(req, res) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(200).json({ message: "Ошибка при регистрации", errors })
		}

		try {
			const { email, password } = req.body;
			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
			}

			const hashPassword = await bcrypt.hash(password, 5);
			const user = new User({ email, password: hashPassword });
			await user.save();
			await fileService.createDir(new File({ user: user.id, name: '' }));
			return res.json("Пользователь успешно зарегистрирован")
		} catch (e) {
			console.log(e);
			return res.json({ message: 'Server error' })
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: `Пользователь не найден` });
			}

			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				res.status(200).json({ message: `Введен неверный пароль` });
			}

			const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					userSpace: user.userSpace,
					avatar: user.avatar
				}
			})

		} catch (e) {
			console.log(e);
			return res.json({ message: 'Registration error' })
		}
	}

	async auth(req, res) {
		try {
			const user = await User.findOne({ _id: req.user.id })
			const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					userSpace: user.userSpace,
					avatar: user.avatar
				}
			})
		} catch (e) {
			console.log(e)
			res.send({ message: "Server error" })
		}
	}


}

module.exports = new authController();