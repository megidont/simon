var Discord = require('discord.js');
var auth = require('./auth.json');
var fs = require('fs');

function writeJSON(json, fname){

	fs.writeFile('./' + fname, JSON.stringify(json), 'utf8', function(err){if(err != null){console.log(err);}});

}

var bot = new Discord.Client({partials: ['MESSAGE', 'CHANNEL']});

bot.once('ready', function (event){

	console.log("Connected as " + bot.user.username + " (" + bot.user.id + ")");
	bot.user.setActivity("for \"@simon\".", {type: "WATCHING" });

});

bot.on('message', async function(message){

	if(message.partial){try{await message.fetch();}catch(error){console.log(error);return;}}

	var at = "<@" + bot.user.id + ">";
	var nickat = "<@!" + bot.user.id + ">";

	if(message.guild == null){

		message.channel.send("I only work in a server. Please send a message beginning with <@" + bot.user.id + "> in a server for a list of users sorted by last message.");

	}else{

		if(message.content.startsWith(at) || message.content.startsWith(nickat)){

			//yaay bot stuff lets make sure I didn't screw the boilerplate real fast

		}

	}

});