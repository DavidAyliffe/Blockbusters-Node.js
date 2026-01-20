const service = require("../services/customerService");

exports.getAll = async (req, res) => { res.json(await service.getAll()); };


exports.getById = async (req, res) => {
  const customer = await service.getById(req.params.id);

  if ( ! customer ) { return res.status(404).json( { error: "Customer not found" } ); }

  res.json(customer);
};

exports.create = async (req, res) => { res.status(201).json(await service.create(req.body)); };

exports.update = async (req, res) => { res.json(await service.update(req.params.id, req.body)); };

exports.remove = async (req, res) => { await service.remove(req.params.id); res.sendStatus(204); };
