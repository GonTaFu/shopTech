const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes')

const app = express();
const PORT = process.env.PORT || 3000;

// db
const uri = "mongodb+srv://gontafu:0931257398sS@shoppingonline.o4qff.mongodb.net/shoppingonline";

var db = mongoose.connect(uri).then(() => console.log("Kết nối thành công với MongoDB Atlas!"))

// // middlewares
// const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.use('/',router);

// Listen
app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});