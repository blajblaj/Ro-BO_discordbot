const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

function pluck(array) {
	return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
  return (pluck(mem.roles).includes(role));
}
function commandIs(str, msg){
	return msg.content.toLowerCase().startsWith("!" + str)
}

bot.on('ready', () => {
	console.log('Bot Online!');
});

bot.on("guildMemberAdd", member =>{
	let guild = member.guild;
	message.guild.channels.find("name", "289247179921424384").sendMessage( `Welcome, ${member.user} to the California VEX Teams Discord! `);
});

var meme = [
  'Tips more than 21S',
  '8686868686868686',
  'lol worse than 8000H',
  'spermflys',
  '62? more like 60X XD',
  'GIT GUD M8',
  'not enough water',
  'Coryz typing skill level'
];

bot.on('message', message => {
	if(message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;

	let command = message.content.split(" ")[0];
	command = command.slice(config.prefix.length);
	console.log(command);

	let args = message.content.split(" ").slice(1);

  if(command === "help") {
    message.channel.sendMessage(
    "**!meme** | Displays:ok_hand: :fire: meme\n**!ping** | pong\n**!say <message>** | I'll do whatever you say :wink:\n**!kick** | Bye bye :cry:\n**!purge <input>** | Clears messages from chat\n**!roll** | Roll the dice!");
  }

  if(command === "heil") {
    message.reply("you now accept Cory as your new Supreme Overlord. Bow Down!");
  }

	if(command === "say") {
		if(hasRole(message.member, "Admin") || (message.member, "Mods")){
      var placeHolder = args.join("");
			message.channel.sendMessage(placeHolder);
		}else {
			message.reply("Don't tell me what to do :angry:");
		}
	}

	if(command === "meme") {
		message.reply(meme[Math.floor((Math.random() * meme.length))]);
	}

  if(command === "roll") {
    var rolled = Math.floor((Math.random() * 100));
    message.channel.sendMessage(':game_die: ' + rolled);
  }

	if(command === "kick") {
		let modRole = message.guild.roles.find("name", "Admin");
		if(!hasRole(message.member, "Admin")){
			return message.reply("If you do that again I'll kick you :angry:");
		}
		if(message.mentions.users.size === 0){
			return message.reply("Mention a user to kick");
		}
		let kickMember = message.guild.member(message.mentions.users.first());
		if(!kickMember){
			return message.reply("That isn't a user...");
		}
		if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
			return message.reply("I do not have the permissions to do this.");
		}
		kickMember.kick().then(member =>{
			message.reply(`${member.user.usernaem} was kicked`);
			}).catch(e =>{
			console.error(e);
		});
	}

	if(command === "ping") {
		message.channel.sendMessage('pong');
	}
});


bot.on('message', (message) => {
	var args = message.content.split(/[ ]+/);
	if(commandIs("purge", message)){
		if(hasRole(message.member, "Admin") || (message.member, "Mods")){
			if(args.length >= 3){
				message.channel.sendMessage("You defined too many arguments. Usage:");
				}else{
				var msg;
				if (args.length === 1){
					msg=2;
					}else{
					msg=parseInt(args[1]) + 1;
				}
			message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
			}
			}else {
			message.channel.sendMessage("You must be an [Admin] to use this command.");
		}
	}
});



bot.login(config.token);
