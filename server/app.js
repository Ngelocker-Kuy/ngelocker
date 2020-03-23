const express = require("express");
const app = express();
const index = require("./routes/index");
const server = require('http').Server(app)
const io = require('socket.io')(server);

const cors = require("cors");
const error = require("./middleware/errorHandling");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    socket.on('newGuest', (UserId) => {
        // emit to react native

        // emit to waiting room web
        // socket.emit(`permission-${UserId}`, { status: true })
    });
});

app.use((req, res, next) => {
    req.io = io

    next()
})
app.use("/", index);
app.use(error);

module.exports = server;
