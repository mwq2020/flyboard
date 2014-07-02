'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('dashboards', function (table) {
            table.json('config').notNullable().defaultTo('{}');
        })
    ]);
};

exports.down = function () {
};
