const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// models
const Note = require('./server/models/note.js');

// загружаем скрытые переменные
if (!process.env.NODE_ENV === "production") {
    require('dotenv').load();
}

// mongoose
mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds017155.mlab.com:17155/notes`);

// serve static files
app.use(express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});


// helper. emits state to users
function emitState(io) {
    Note.find()
        .sort({ created: -1 })
        .exec((err, notes) => {
            if (err) return console.error(err);
            io.sockets.emit('state', notes);
        });
}


io.on('connection', (socket) => {

    // высылаем состояние приложения всем пользователям
    emitState(io);

    // добавление
    socket.on('add note', ({ noteText }) => {
        const note = new Note({ text: noteText });
        note.save((err, note) => {
            if (err) return console.error(err);
            emitState(io);
        });
    });

    // удаление
    socket.on('delete note', (noteId) => {
        Note.findByIdAndRemove(noteId, (err, note) => {
            if (err) return console.error(err);
            emitState(io);
        });
    });

    // редактировние
    socket.on('edit note', (noteId) => {

        Note.findByIdAndUpdate(
            noteId,
            { occupied: socket.id }, // {$set: { occupied: socket.id }}
            (err, note) => {
                if (err) return console.error(err);
                emitState(io);
            }
        );
    });

    // выход из режима редактирования заметки
    socket.on('free note', (noteId) => {
        Note.findByIdAndUpdate(
            noteId,
            { $unset: {occupied: "" }},
            (err, note) => {
                if (err) return console.error(err);
                emitState(io);
            }
        );
    });

    // сохранение заметки
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

    // выйти из режима редактирования при закрытии вкладки
    socket.on('disconnect', () => {
        Note.update(
            { occupied: socket.id },
            { $unset: { occupied: ''}},
            (err) => {
                if (err) return console.error(error);
                emitState(io);
            }
        );
    });

});

const port = process.env.PORT || 3000
http.listen(port, () => {
    console.log("Express server running at http://localhost:" + port);
});
