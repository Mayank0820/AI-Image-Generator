const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const app = express();

mongoose.connect('mongodb+srv://Cluster52609:WWNeXlhjb2Jm@cluster52609.p2emb.mongodb.net/ai?retryWrites=true&w=majority')
.then(() => {
    console.log("DB Connected")
})
.catch((e) => {

    console.log("Error in DB " + e)

})


app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (user) {
        if (user.password === password) {
            res.status(200).send({ msg: 'user exists and password is correct' });
        } else {
            res.status(401).send({ msg: 'user exists but password is incorrect' });
        }
    } else {
        res.status(404).send({ msg: 'user does not exist' });
    }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });
    if (user) {
        res.status(409).send({ msg: 'user already exists' });
    } else {
        await User.create({
            name: username,
            password: password,
        });
        res.status(201).send({ msg: 'user created' });
    }
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(4003, () => {
    console.log('server started on port 4003');
});
