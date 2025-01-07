'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelName = 'lotto';
var tableName = 'lotto';

module.exports = mongoose.model(
    modelName,
    new Schema({
        drawDate: { type: String },
        drawNumber: { type: Number },
        results: [
            {
                lottoType: { type: Number },
                ballsDrawn: [
                    {
                        position: { type: Number },
                        number: { type: Number }
                    }
                ]
            }
        ],
        boardsPlayed: [
            {
                datePlayed: { type: String },
                lottoPlus: { type: Boolean },
                lottoPlus2: { type: Boolean },
                ballNumber: [{ type: Number }]
            }
        ],
        cost: { type: Number },
        paidWith: { type: Number },
        description: { type: String },
        created: { type: String },
        canceled: { type: String },
        canceledDate: { type: Date },
        user: { type: String }
    }),
    tableName
);
