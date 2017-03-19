const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}
function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    }else{
        return false;
    }
}
function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str)
}

bot.on('ready', () => {
  console.log('Bot Online!');
});

bot.on("guildMemberAdd", member =>{
  let guild = member.guild;
  message.guild.channels.find("name", "289247179921424384").sendMessage( `Welcome, ${member.user} to the server! `);
});

bot.on("guildCreate", guild =>{
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

var meme = ['Tips more than 21S', '8686868686868686', 'lol worse than 8000H', 'spermflys', '62? more like 60X XD', 'GET GUD M8'];

bot.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  console.log(command);

  let args = message.content.split(" ").slice(1);

  if(command === "add"){
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
  }

  if(command === "say"){
    let modRole = message.guild.roles.find("name", "Admin");
    if(message.member.roles.has(modRole.id)){
      message.channel.sendMessage(args.join(" "));
    } else {
      message.reply("You do not have access to this command.");
    }

  }

  if(command === "meh-meh"){
    message.reply(meme[Math.floor((Math.random() * (meme.length)))]);

  }

  if(command === "kick"){
    let modRole = message.guild.roles.find("name", "Admin");
    if(!hasRole(message.member, "Admin")){
      return message.reply("You do not have access to this command.");
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention a user to kick");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember){
      return message.reply("That user is not valid.");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
      return message.reply("I do not have the permissions to do this.");
    }
    kickMember.kick().then(member =>{
      message.reply(`${member.user.usernaem} was succesfully kicked.`);
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
