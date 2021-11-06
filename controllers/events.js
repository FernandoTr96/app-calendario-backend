const { response, request } = require('express');
const mongoose = require('mongoose');
const EventModel = require('../models/EventModel');

const getEvents = async (req = request, res = response) => {

    //populate permite extraer la info de una llave foranea o referencia
    const events = await EventModel
        .find()
        .populate('user', 'uid name');

    if (events) {
        return res.status(201).json({
            ok: true,
            events
        });
    }

    res.status(401).json({
        ok: false,
        msg: 'No hay eventos almacenados programados actualmente'
    });

}

const getEventById = async (req = request, res = response) => {

    const id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {

        try {

            //populate permite extraer la info de una llave foranea o referencia
            const event = await EventModel
                .findById(id)
                .populate('user', 'uid name');

            if (!event) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No se encontro el evento'
                });
            }

            res.status(201).json({
                ok: true,
                event
            });


        } catch (error) {

            return res.status(401).json({
                ok: false,
                msg: 'No se encontro el evento'
            });

        }

    }

    res.status(401).json({
        ok: false,
        msg: 'El id no es uno valido'
    });

}

const addEvent = async (req = request, res = response) => {

    const event = new EventModel(req.body);

    try {

        event.user = req.auth.uid;
        await event.save();

        res.status(201).json({
            ok: true,
            event
        });

    } catch (error) {
        // console.log(error);
        res.status(401).json({
            ok: false,
            msg: `Error ${error.code} : hable con soporte tecnico`
        });

    }

}

const updateEvent = async (req = request, res = response) => {

    const id = req.params.id;

    try {

        const event = await EventModel
        .findById(id)
        .populate('user', 'uid name');;

        if (!event) {
            return res.status(404).json({
                ok: true,
                msg: `No existe el evento a modificar`
            });
        }

        if(event.user.id !== req.auth.uid){
            return res.status(401).json({
                ok: true,
                msg: `No tienes permiso para modificar esto`
            });
        }

        const newEvent = {
            ...req.body,
            user: req.auth.uid
        }

        await EventModel.findByIdAndUpdate(id,newEvent);

        return res.status(201).json({
            ok: true
        });

    } catch (error) {

        console.log(error);
        res.status(401).json({
            ok: true,
            msg: `Error ${error.code} : hable con soporte tecnico`
        });

    }

}

const deleteEvent = async (req = request, res = response) => {

    const id = req.params.id;

    try {

        const event = await EventModel
        .findById(id)
        .populate('user', 'uid name');

        if (!event) {
            return res.status(404).json({
                ok: true,
                msg: `No existe el evento a eliminar`
            });
        }

        if(event.user.id !== req.auth.uid){
            return res.status(401).json({
                ok: true,
                msg: `No tienes permiso para eliminar esto`
            });
        }

        await EventModel.findByIdAndDelete(id);

        res.status(201).json({
            ok: true
        })
        

    } catch (error) {

        console.log(error);
        res.status(401).json({
            ok: true,
            msg: `Error ${error.code} : hable con soporte tecnico`
        });

    }
}

module.exports = {
    getEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
}