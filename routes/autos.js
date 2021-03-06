const express = require('express');
const Auto = require('../models/autos');
const Usuario = require('../models/usuarios');
const app = express();

app.get('/autos/', function (req, res) {
    Auto.find((err, autoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            auto: autoDB
        });

    })
})

app.get('/autos', function (req, res) {
    let buscado = {
        modelo: req.query.modelo,
        marca: req.query.marca,
        year: req.query.year
    }

    Auto.find(buscado, (err, autosEncontrados) => {
        let arrayMatch = [];
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Usuario.find().populate('auto').exec((err, usuariosDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            for (let i = 0; i < autosEncontrados.length; i++) {
                for (let j = 0; j < usuariosDB.length; j++) {
                    if ((usuariosDB[j].auto[0]._id).toString() == (autosEncontrados[i]._id).toString()) {
                        arrayMatch.push(usuariosDB[j]);
                    };
                }
            }
            var response = JSON.parse(JSON.stringify(arrayMatch))
            res.json({
                ok: true,
                response
            });
        });
    })
})

app.post('/autos', function (req, res) {
    let body = req.body;
    let auto = new Auto({
        marca: body.marca,
        modelo: body.modelo,
        year: body.year
    });
    auto.save((err, autoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            auto: autoDB
        });
    });
});

app.put('/autos/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;
    Auto.findByIdAndUpdate(id, body, { new: true }, (err, autoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            auto: autoDB
        });
    })
});

app.delete('/autos/:id', function (req, res) {
    let id = req.params.id;
    Auto.findByIdAndRemove(id, (err, autoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!autoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Auto no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            auto: autoBorrado
        });
    });
});

module.exports = app;