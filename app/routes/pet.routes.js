module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    // Create a new Pet
    //https://petsapi4537.herokuapp.com/pets/?name=lg&type=cat&breed=white cat&age=6
    app.post("/pets", pets.create);

    // app.post("/pets/upload", upload.single("file"), uploadController.uploadFiles);


    // Retrieve all Pets
    // https://petsapi4537.herokuapp.com/pets/
    app.get("/pets", pets.findAll);

    // Retrieve all Pets by type
    // To call https://petsapi4537.herokuapp.com/pets/pettype?type=dog
    app.get("/pets/pettype", pets.findAllByType);

    // Retrieve a single Pet with petId
    // https://petsapi4537.herokuapp.com/pets/petid?petid=11
    app.get("/pets/petid", pets.findOne);



    // Update a Pet with petId
    //- POST request, needs to be sent in the fetch by client will be a JSON
    app.put("/pets/update", pets.update);




    // Delete a Pet with petId
    // https://petsapi4537.herokuapp.com/pets/delete?petid=51
    app.delete("/pets/delete", pets.delete);

    // Delete all Pets by type
    //https://petsapi4537.herokuapp.com/pets/detelebytype?type=cat
    app.delete("/pets/detelebytype", pets.deleteAllByType);


};