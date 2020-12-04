module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    // Create a new Pet
    app.post("/pets", pets.create);

    // Retrieve all Pets
    app.get("/pets", pets.findAll);

    // Retrieve a single Pet with petId
    app.get("/pets/:petId", pets.findOne);

    // Update a Pet with petId
    app.put("/pets/:petId", pets.update);

    // Delete a Pet with petId
    app.delete("/pets/:petId", pets.delete);

    // Create a new Pet
    app.delete("/pets", pets.deleteAll);
};