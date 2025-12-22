const service = require("../services/countryService");

exports.getAll = async (req, res) => { res.json(await service.getAll()); };


exports.getById = async (req, res) => {
  const country = await service.getById(req.params.id);

  if ( ! country ) { return res.status(404).json( { error: "Country not found" } ); }

  res.json(country);
};

exports.create = async (req, res) => { res.status(201).json(await service.create(req.body)); };

exports.update = async (req, res) => { res.json(await service.update(req.params.id, req.body)); };

exports.remove = async (req, res) => { await service.remove(req.params.id); res.sendStatus(204); };
