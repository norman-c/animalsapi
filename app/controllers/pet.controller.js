const Pet = require("../models/pet.model.js");

// Create and Save a new Pet
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Pet
    const pet = new Pet({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Save Pet in the database
    Pet.create(pet, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pet."
            });
        else res.send(data);
    });
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
    Pet.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving pets."
            });
        else res.send(data);
    });
};

// Find a single Pet with a dogId
exports.findOne = (req, res) => {
    Pet.findById(req.params.dogId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pet with id ${req.params.dogId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pet with id " + req.params.dogId
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

    Pet.updateById(
        req.params.dogId,
        new Pet(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Pet with id ${req.params.dogId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Pet with id " + req.params.dogId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Pet with the specified dogId in the request
exports.delete = (req, res) => {
    Pet.remove(req.params.dogId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pet with id ${req.params.dogId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pet with id " + req.params.dogId
                });
            }
        } else res.send({ message: `Pet was deleted successfully!` });
    });
};

// Delete all Pets from the database.
exports.deleteAll = (req, res) => {
    Pet.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all pets."
            });
        else res.send({ message: `All Pets were deleted successfully!` });
    });
};