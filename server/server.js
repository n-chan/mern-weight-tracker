const express = require ("express");
const cors = require ("cors");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
})

const entriesRouter = require("./routes/entries");
const usersRouter = require ("./routes/users");

app.use("/users", usersRouter);
app.use("/entries", entriesRouter); //if link/weights, then everything in weightsRouter is loaded

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})