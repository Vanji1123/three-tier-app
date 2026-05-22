const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend API Running Successfully");
});

app.post("/api/users", (req, res) => {

    const { name, email, phone, address } = req.body;

    const sql =
        "INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        [name, email, phone, address],
        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json({
                    message: "Database Error"
                });

            } else {

                res.json({
                    message: "User Registered Successfully"
                });

            }

        }
    );

});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
