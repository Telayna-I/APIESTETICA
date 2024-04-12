const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createUser = async (req = request, res = response) => {
	const { name, email, password, status, google, role } = req.body;

	const user = new User({ name, email, password, role });

	const salt = bcryptjs.genSaltSync(10);
	user.password = bcryptjs.hashSync(password, salt);

	try {
		await user.save();
		res.json({
			user,
			data: req.body,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const deleteUser = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (user.status) {
			const newUser = await User.findByIdAndUpdate(
				id,
				{
					status: false,
				},
				{ new: true }
			);

			return res.status(200).json({ newUser });
		} else {
			const newUser = await User.findByIdAndUpdate(
				id,
				{
					status: true,
				},
				{ new: true }
			);

			return res.status(200).json({ newUser });
		}
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getUsers = async (req = request, res = response) => {
	try {
		const [total, users] = await Promise.all([
			User.countDocuments(),
			User.find(),
		]);

		res.status(200).json({
			total,
			users,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

module.exports = { createUser, deleteUser, getUsers };
