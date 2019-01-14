const express = require('express');
const mongoose = require('mongoose');
const _ = require('underscore');
const Usuario = require('../models/usuarios');
const Autos = require('../models/autos');
const app = express();

app.get('/usuarios', function (req, res) {
    Usuario.find().populate('auto').exec(function (err, usuarioDB) {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
})

app.post('/usuarios', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        nombre: body.nombre,
        rut: body.rut
    });

    let auto = new Autos({
        marca: body.marca,
        modelo: body.modelo,
        year: body.year
    })

    auto.save((err, autoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    });

    usuario.auto.push(auto._id);

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id).populate('auto').exec(function (err, usuarioDB) {

        if (err || usuarioDB === null) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.findByIdAndUpdate(id, body, (err) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        })

        let newAuto = {
            marca: body.marca,
            modelo: body.modelo,
            year: body.year
        }
        Autos.findByIdAndUpdate(usuarioDB.auto[0].id, newAuto, { new: true }, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        })
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    Usuario.findById(id).populate('auto').exec(function (err, usuarioDB) {
        if (err || usuarioDB === null) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Autos.findByIdAndRemove(usuarioDB.auto[0]._id, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        })
        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        });
    })
});



module.exports = app;