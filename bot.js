var Discord = require('discord.js');
var auth = require('./auth.json');
var fs = require('fs');

function writeJSON(json, fname){

	fs.writeFile('./' + fname, JSON.stringify(json), 'utf8', function(err){if(err != null){console.log(err);}});

}

var bot = new Discord.Client();