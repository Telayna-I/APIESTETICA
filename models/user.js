const { Schema, model } = require("mongoose");

const userSchema = Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio."],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio."],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria."],
	},
	role: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
	img: {
		type: String,
	},
});

userSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

module.exports = model("User", userSchema);
