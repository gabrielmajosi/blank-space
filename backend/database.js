function createUserTable(db) {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (email TEXT, username TEXT, password TEXT)"
    );
}

function insertUser(db, email, username, password) {
    db.run("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [
        email,
        username,
        password,
    ]);
}

function getUser(db, username, callback) {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        callback(row);
    });
}

module.exports = {
    createUserTable,
    insertUser,
    getUser,
};
