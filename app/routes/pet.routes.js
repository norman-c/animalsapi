module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    // Create a new Pet
    //https://petsapi4537.herokuapp.com/api/v1/pets/?name=lg&type=cat&breed=white cat&age=6
    app.post("/api/v1/pets", pets.create);


    app.post('/api/v1/pets/upload', upload.single('picture'), pets.upload);

    // Retrieve all Pets
    // https://petsapi4537.herokuapp.com/api/v1/pets/
    app.get("/api/v1/pets", pets.findAll);

    // Retrieve all Pets by type
    // To call https://petsapi4537.herokuapp.com/api/v1/pets/pettype?type=dog
    app.get("/api/v1/pets/pettype", pets.findAllByType);

    // Retrieve a single Pet with petId
    // https://petsapi4537.herokuapp.com/api/v1/pets/petid?petid=11
    app.get("/api/v1/pets/petid", pets.findOne);



    // Update a Pet with petId
    //- POST request, needs to be sent in the fetch by client will be a JSON
    app.put("/api/v1/pets/update", pets.update);




    // Delete a Pet with petId
    // https://petsapi4537.herokuapp.com/api/v1/pets/delete?petid=51
    app.delete("/api/v1/pets/delete", pets.delete);

    // Delete all Pets by type
    //https://petsapi4537.herokuapp.com/api/v1/pets/detelebytype?type=cat
    app.delete("/api/v1/pets/detelebytype", pets.deleteAllByType);


};