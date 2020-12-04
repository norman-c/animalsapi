const sql = require("./db.js");

// constructor
const Owner = function(owner) {
    this.name = owner.name;
    this.age = owner.age;
    this.petid = owner.petid
};

Owner.create = (newOwner, result) => {
    sql.query("INSERT INTO owners SET ?", newOwner, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created owner: ", { id: res.insertId, ...newOwner });
        result(null, { id: res.insertId, ...newOwner });
    });
};


Owner.findById = (ownerId, result) => {
    sql.query(`SELECT * FROM owners WHERE id = ${ownerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found owner: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Owner with the id
        result({ kind: "not_found" }, null);
    });
};


Owner.getAll = result => {
    sql.query("SELECT * FROM owners", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("owners: ", res);
        result(null, res);
    });
};

Owner.updateById = (ownerId, owner, result) => {
    sql.query(
        "UPDATE owners SET name = ?, age = ?, petid = ? WHERE id = ?", [owner.name, owner.age, owner.petid, ownerId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Owner with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated owner: ", { id: ownerId, ...owner });
            result(null, { id: ownerId, ...owner });
        }
    );
};

Owner.remove = (ownerId, result) => {
    sql.query(`DELETE FROM owners WHERE id = ${ownerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Owner with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted owner with id: ", ownerId);
        result(null, res);
    });
};


module.exports = Owner;