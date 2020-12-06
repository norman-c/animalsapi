const Owner = require("../models/owner.model.js");

// Create and Save a new Pet
exports.create = (req, res) => {
    // Validate request
    if (!req.query) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Owner
    const owner = new Owner({
        name: req.query.name,
        age: req.query.age,
        petid: req.query.petid
    });

    // Save Pet in the database
    Owner.create(owner, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Owner."
            });
        else res.send(data);
    });
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
    Owner.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving owners."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Owner.findById(req.query.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Owner with id ${req.query.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Owner with id " + req.query.id
                });
            }
        } else res.send(data);
    });
};


// Update a Pet identified by the dogId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Owner.updateById(
        req.body.id,
        new Pet(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Pet with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Pet with id " + req.body.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Owner with the specified id in the request
exports.delete = (req, res) => {
    Owner.remove(req.query.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found owner with id ${req.query.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete owner with id " + req.query.id
                });
            }
        } else res.send({ message: `onwer was deleted successfully!` });
    });
};