const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./routes')

const app = express();
const PORT = process.env.PORT || 4000;

// db
const uri = "mongodb+srv://pikachu123450vn:phuc1234567890@cluster0.4lvmo.mongodb.net/shoppingonline";

var db = mongoose.connect(uri).then(() => console.log("Kết nối thành công với MongoDB Atlas!"))

// // middlewares
// const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// apis
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.use('/',router);

// Listen
app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});



