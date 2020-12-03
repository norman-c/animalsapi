const sql = require("./db.js");

// constructor
const Dog = function(dog) {
    this.breed = dog.breed;
    this.name = dog.name;
    this.age = dog.age;
};

Dog.create = (newDog, result) => {
    sql.query("INSERT INTO dogs SET ?", newDog, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created dog: ", { id: res.insertId, ...newDog });
        result(null, { id: res.insertId, ...newDog });
    });
};

Dog.findById = (dogId, result) => {
    sql.query(`SELECT * FROM dogs WHERE id = ${dogId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found dog: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Dog with the id
        result({ kind: "not_found" }, null);
    });
};

Dog.getAll = result => {
    sql.query("SELECT * FROM dogs", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("dogs: ", res);
        result(null, res);
    });
};

Dog.updateById = (id, dog, result) => {
    sql.query(
        "UPDATE dogs SET breed = ?, name = ?, age = ? WHERE id = ?", [dog.breed, dog.name, dog.age, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Dog with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated dog: ", { id: id, ...dog });
            result(null, { id: id, ...dog });
        }
    );
};

Dog.remove = (id, result) => {
    sql.query("DELETE FROM dogs WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Dog with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted dog with id: ", id);
        result(null, res);
    });
};

Dog.removeAll = result => {
    sql.query("DELETE FROM dogs", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} dogs`);
        result(null, res);
    });
};

module.exports = Dog;