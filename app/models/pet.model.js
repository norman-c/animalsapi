const sql = require("./db.js");

// constructor
const Pet = function(pet) {
    this.type = pet.type;
    this.breed = pet.breed;
    this.name = pet.name;
    this.age = pet.age;
};

Pet.create = (newDog, result) => {
    sql.query("INSERT INTO pets SET ?", newDog, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created pet: ", { id: res.insertId, ...newDog });
        result(null, { id: res.insertId, ...newDog });
    });
};

Pet.findById = (petId, result) => {
    sql.query(`SELECT * FROM pets WHERE id = ${petId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pet: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Pet with the id
        result({ kind: "not_found" }, null);
    });
};

Pet.getAll = result => {
    sql.query("SELECT * FROM pets", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pets: ", res);
        result(null, res);
    });
};

Pet.updateById = (id, pet, result) => {
    sql.query(
        "UPDATE pets SET breed = ?, name = ?, age = ? WHERE id = ?", [pet.breed, pet.name, pet.age, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Pet with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated pet: ", { id: id, ...pet });
            result(null, { id: id, ...pet });
        }
    );
};

Pet.remove = (id, result) => {
    sql.query("DELETE FROM pets WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Pet with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted pet with id: ", id);
        result(null, res);
    });
};

Pet.removeAll = result => {
    sql.query("DELETE FROM pets", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} pets`);
        result(null, res);
    });
};

module.exports = Pet;