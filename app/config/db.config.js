module.exports = {
    HOST: "us-cdbr-east-02.cleardb.com",
    USER: "bb9d2d5cab8605",
    PASSWORD: "d10e9c3e",
    DB: "heroku_ba7834bb2a8f15d"
};

module.exports = {
    'secret': 'supersecret'
};

// mysql --host=us-cdbr-east-02.cleardb.com --user=bb9d2d5cab8605 --password=d10e9c3e --reconnect heroku_ba7834bb2a8f15d

// mysql> CREATE TABLE IF NOT EXISTS `pets` (
//     id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     type varchar(255) NOT NULL,
//     name varchar(255) NOT NULL,
//     breed varchar(255) NOT NULL,
//     age int(11) NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;