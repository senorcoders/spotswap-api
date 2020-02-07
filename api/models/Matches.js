/**
 * Matches.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		matchstyle: {
			type: 'string' // Folk Style, Freestyle, Greco Roman
		},
		matchtype: {
			type: 'string', // Championship, consolation
			allowNull: true
		},
		wrestler: {
			type: 'string' // Wrestler Name
		},
		wrestler_id: {
			type: 'number'
		},
		opponent: {
			type: 'string' // Opponent Name
		},
		oppenentid: {
			type: 'number', // If we can find the wrestler id of the opponent
			allowNull: true
		},
		opponent_team: {
			type: 'string',
			allowNull: true
		},
		opponent_teamid: {
			type: 'number'
		},
		match_complete: {
			type: 'boolean',
			defaultsTo: false
		},
		score: {
			type: 'json'
		},
		weightclass: {
			type: 'string'
		},
		notes: {
			type: 'string'
		},
		meet: {
			model: 'Meets'
		},
		team: {
			model: 'Teams'
		},
		wrestlerid: {
			model: 'Wrestlers'
		}


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

