module.exports = app => {
    const dogs = require("../controllers/dog.controller.js");

    // Create a new Dog
    app.post("/dogs", dogs.create);

    // Retrieve all Dogs
    app.get("/dogs", dogs.findAll);

    // Retrieve a single Dog with dogId
    app.get("/dogs/:dogId", dogs.findOne);

    // Update a Dog with dogId
    app.put("/dogs/:dogId", dogs.update);

    // Delete a Dog with dogId
    app.delete("/dogs/:dogId", dogs.delete);

    // Create a new Dog
    app.delete("/dogs", dogs.deleteAll);
};