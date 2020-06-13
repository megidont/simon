var Discord = require('discord.js');
var auth = require('./auth.json');
var fs = require('fs');
var beautify = require('json-beautify');

function writeJSON(json, fname){

	fs.writeFile('./' + fname, beautify(json, null, 2, 110), 'utf8', function(err){if(err != null){console.log(err);}});

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

	if(message.guild == null && message.author.bot != true){

		message.channel.send("I only work in a server. Please send a message beginning with <@" + bot.user.id + "> in a server for a list of users sorted by last message.");

	}else{

		if((message.content.startsWith(at) || message.content.startsWith(nickat)) && message.author.bot != true){

			message.channel.send("Works so far.");
			var users = {};
			for(let m of message.guild.members.cache){

				console.log(m[1].user);
				if(typeof m[1].user !== 'undefined'){
					users[m[1].user.username + "#" + m[1].user.discriminator] = {

						id: m[1].user.id,
						lastMessageSendTime: m[1].lastMessage.createdAt

					}
				}

			}
			writeJSON(users, "users.json");
			message.author.send("And so does this.", {files: [{attachment: './users.json', name: 'users.json'}]}).catch(console.log);

		}

	}

});

bot.login(auth.token);