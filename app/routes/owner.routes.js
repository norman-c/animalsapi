module.exports = app => {
    const owners = require("../controllers/owner.controller.js");

    // Create a new Owner
    // https://petsapi4537.herokuapp.com/owners?name=norman&age=11&petid=61
    app.post("/owners", owners.create);


    // Retrieve all Owners
    // https://petsapi4537.herokuapp.com/owners
    app.get("/owners", owners.findAll);

    // Retrieve a single owner with ownerId
    // https://petsapi4537.herokuapp.com/owners?name=norman&age=11&petid=11
    app.get("/owners/ownerId", owners.findOne);

    // Update a Owner with petId
    //- POST request, needs to be sent in the fetch by client will be a JSON
    app.put("/owners/update", owners.update);

    // Delete a Owner with petId
    // https://petsapi4537.herokuapp.com/owners/delete?id=11
    app.delete("/owners/delete", owners.delete);


};