const { Schema, model, SchemaTypes } = require("mongoose");

const depilationShiftSchema = Schema({
	zone: {
		cuerpoCompletoM: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		MDIAxilasCavado: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		cavadoAxilas: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		cavadoNormal: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		cavadoCompleto: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		axilas: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		piernasEnteras: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		mPiernaInferior: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		mPiernaSuperior: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		rostro: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		bozo: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		menton: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		tiraDelAlba: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		tiraDeCola: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		gluteos: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		entrecejo: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		espalda: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		brazos: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		patillas: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		antebrazo: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		abdomen: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		pies: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		dedos: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		pecho: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		zonaLumbar: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		manos: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		nuca: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		empeine: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		pechoAbdomen: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		abdomenEspalda: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		hombros: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		pelvis: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
		barba: {
			toDo: {
				type: Boolean,
				default: false,
			},
			force: {
				type: String,
				default: "",
			},
		},
	},
	price: {
		type: String,
		required: [true, "El precio es obligatorio."],
	},
	date: {
		type: String,
		required: [true, "La fecha es obligatoria."],
	},
	hour: {
		type: String,
		required: [true, "La fecha es obligatoria."],
	},
	patient: {
		type: SchemaTypes.ObjectId,
		ref: "Patient",
		required: true,
	},
	notes: {
		type: String,
	},
	finished: {
		type: Boolean,
		default: false,
	},
	dateOfShift: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
});

depilationShiftSchema.methods.toJSON = function () {
	const { __v, _id, ...depilationShift } = this.toObject();
	depilationShift.uid = _id;
	return depilationShift;
};

module.exports = model("Depilation", depilationShiftSchema);
