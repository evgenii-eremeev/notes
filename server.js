const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// models
const Note = require('./server/models/note.js');

// mongoose
mongoose.connect('mongodb://localhost:27017/notes');

// serve static files
app.use(express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

function emitState(io) {
    Note.find(function (err, notes) {
        if (err) return console.error(err);
        io.sockets.emit('state', notes);
    });
}


io.on('connection', (socket) => {

    emitState(io);

    socket.on('add note', ({ noteText }) => {
        const note = new Note({ text: noteText });
        note.save((err, note) => {
            if (err) return console.error(err);
            emitState(io);
        });
    });

    socket.on('delete note', (noteId) => {
        Note.findByIdAndRemove(noteId, (err, note) => {
            if (err) return console.error(err);
            emitState(io);
        });
    });

    socket.on('edit note', (noteId) => {
        Note.findByIdAndUpdate(
            noteId,
            { occupied: socket.id }, // sent as {$set: {...}}
            (err, note) => {
                if (err) return console.error(err);
                emitState(io);
            }
        );
    });

    socket.on('free note', (noteId) => {
        Note.findByIdAndUpdate(
            noteId,
            { $unset: {occupied: socket.id }},
            (err, note) => {
                if (err) return console.error(err);
                emitState(io);
            }
        );
    });

    socket.on('save note', ({noteId, noteText}) => {
        Note.findByIdAndUpdate(
            noteId,
            { text: noteText, occupied: ""},
            (err, note) => {
                if (err) return console.error(err);
                emitState(io);
            }
        );
    });

    socket.on('disconnect', () => {
        Note.update(
            { occupied: socket.id },
            { $unset: { occupied: ''}},
            (err) => {
                if (err) return console.erro(error);
                emitState(io);
            }
        );
    });

});

const port = process.env.PORT || 3000
http.listen(port, () => {
    console.log("Express server running at http://localhost:" + port);
});
