
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {
    dbName: 'config',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to the database');
})
.catch((err) => {
    console.error('Error connecting to the database:', err);
});

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('usersForTravelApp', UserSchema);
User.createIndexes();

// Schema for formular data
const userFormularSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prename: {
        type: String,
        required: true,
    },
    flightClass: {
        type: String,
        required: true,
    },
    luggagesKg: {
        type: String,
        required: true,
    },
    dateAndTime_CheckIn: {
        type: String,
        required: true,
    },
    tripService: {
        type: Boolean,
        default: false,
    },
});

const formular = mongoose.model('userFormular', userFormularSchema);
formular.createIndexes();



// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listens at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
    // You can check if the backend is working or not by 
    // entering http://localhost:5000

    // If you see "App is working," it means
    // the backend is working properly
});
app.post("/save-data", async (req, resp) => {
    try {
        const formData = new formular(req.body);
        let result = await formData.save();
        result = result.toObject();
        resp.status(200).json(result);
        console.log(result);
    } catch (e) {
        resp.status(500).send("Something Went Wrong");
        console.error('Error while saving data:', e);
    }
});


app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already registered");
        }
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.listen(5000);
