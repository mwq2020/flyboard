'use strict';

var router = require('express').Router();
module.exports = router;

var bodyParser = require('body-parser');
var DataSource = require('../logicals/dataSource');
var Record = require('../logicals/record');

router.post(
    '/api/projects/:uuid/data_sources/:key',
    bodyParser.json(),
    function(req, res, next){
        var record = req.body;
        if(record.value === undefined){
            res.send(400);
        }

        DataSource.getByUUIDAndKey(req.param('uuid'), req.param('key')).then(function (dataSource) {
            if (!dataSource) {
                return res.send(404);
            }

            record.data_source_id = dataSource.id;
            return Record.save(record).then(function (id) {
                return Record.get(id);
            }).then(function (record) {
                res.send(record);
            });
        }).catch(next);
    }
);

router.get(
    '/api/records/:id',
    function(req, res, next){
        var id = parseInt(req.param('id'), 10);

        Record.get(id).then(function (record){
            if(!record){
                return res.send(404);
            }

            res.send(record);
        }).catch(next);
    }
);

router.delete(
    '/api/records/:id',
    function(req, res, next) {
        var id = parseInt(req.param('id'), 10);
        Record.remove(id).then(function () {
            res.send(200);
        }).catch(next);
    }
);