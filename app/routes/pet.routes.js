module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    // Create a new Pet
    app.post("/pets", pets.create);


    // Retrieve all Pets
    app.get("/pets", pets.findAll);

    // Retrieve all Pets by type
    app.get("/pets/:petType", pets.findAllByType);

    // Retrieve a single Pet with petId
    app.get("/pets/:petId", pets.findOne);



    // Update a Pet with petId
    app.put("/pets/:petId", pets.update);




    // Delete a Pet with petId
    app.delete("/pets/:petId", pets.delete);

    // Delete all Pets
    app.delete("/pets", pets.deleteAll);

    // Delete all Pets by type
    app.delete("/pets", pets.deleteAllByType);


};