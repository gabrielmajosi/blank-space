const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const database = require("./database");
const validate = require("jsonschema").validate;

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");
database.createUserTable(db);

app.post("/login", (req, res) => {
    const schema = {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
        required: ["username", "password"],
    };

    let json = req.body; // Object { username: "test", password: "test" }
    let errors = validate(json, schema).errors;
    if (errors.length) {
        res.status(400).send("Invalid request");
        return;
    }

    // Check if the credentials are valid
    database.getUser(db, json.username, (user) => {
        if (user && user.password === json.password) {
            res.status(200).send(json);
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

app.post("/register", (req, res) => {
    const schema = {
        type: "object",
        properties: {
            email: { type: "string" },
            username: { type: "string" },
            password: { type: "string" },
        },
        required: ["email", "username", "password"],
    };

    let json = req.body; // Object { email: "test", username: "test", password: "test" }
    let errors = validate(json, schema).errors;
    if (errors.length) {
        console.log(errors);
        res.status(400).send("Invalid request");
        return;
    }

    // If the user already exists then return 409 Conflict
    database.getUser(db, json.username, (user) => {
        console.log(user);

        if (user) {
            res.status(409).send("Conflict");
            return;
        } else {
            database.insertUser(db, json.email, json.username, json.password);
            res.status(201).send(json);

            console.log(`User created: ${json.email}`);
        }
    });
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
