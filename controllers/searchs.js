const { request, response } = require("express");
const { searchPatients } = require("../helpers/db-searchs");

const allowedCollections = ["patients"];

const search = async (req = request, res = response) => {
	// la coleccion va a venir harcodeada en el front porque va a ser el lugar donde se busca.
	// el termino va a ser lo variable y es lo que se va a extraer del buscador y enviar como parametros (term).
	const { collection, term } = req.params;

	if (!allowedCollections.includes(collection)) {
		res.status(400).json({
			msg: `Las colecciones permitidas son: ${allowedCollections}`,
		});
	}

	switch (collection) {
		case "patients":
			searchPatients(term, res);
			break;
		default:
			res.status(500).json({
				msg: "Esta busqueda no esta disponible.",
			});
	}
};

module.exports = {
	search,
};
