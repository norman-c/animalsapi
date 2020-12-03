const Dog = require("../models/dog.model.js");

// Create and Save a new Dog
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Dog
    const dog = new Dog({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Save Dog in the database
    Dog.create(dog, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Dog."
            });
        else res.send(data);
    });
};

// Retrieve all Dogs from the database.
exports.findAll = (req, res) => {
    Dog.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving dogs."
            });
        else res.send(data);
    });
};

// Find a single Dog with a dogId
exports.findOne = (req, res) => {
    Dog.findById(req.params.dogId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dog with id ${req.params.dogId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Dog with id " + req.params.dogId
                });
            }
        } else res.send(data);
    });
};

// Update a Dog identified by the dogId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Dog.updateById(
        req.params.dogId,
        new Dog(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Dog with id ${req.params.dogId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Dog with id " + req.params.dogId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Dog with the specified dogId in the request
exports.delete = (req, res) => {
    Dog.remove(req.params.dogId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dog with id ${req.params.dogId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Dog with id " + req.params.dogId
                });
            }
        } else res.send({ message: `Dog was deleted successfully!` });
    });
};

// Delete all Dogs from the database.
exports.deleteAll = (req, res) => {
    Dog.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all dogs."
            });
        else res.send({ message: `All Dogs were deleted successfully!` });
    });
};