#!/usr/bin/env node
//require() will tell node that we need to use these modules from our node_modules folder
const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
//this line tells node that we need the content from our config folder
const config  = require("./config.json")

//this will define our bot
var bot = new Discord.Client();

//--------------------------------------------- Prepare
bot.on('ready', () => {
	bot.user.setUsername("Acibot")
	console.log(`-------\nReady!\nLogged in as: ${bot.user.username}\nConnected to ${bot.guilds.size} servers and ${bot.users.size} users!\n--------`)
  	bot.user.setPresence({game: {name: `over ${bot.guilds.size} servers | ${config.prefix}help`, type: 3}})
});
/*
bot.on("messageDelete", message => {
	var channel = bot.channels.find("name", "general")
	channel.send(`:pencil: | User **${message.author.username}** deleted a message in ${message.channel} \`Content:\` ${message.content}`)
})
*/

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.on('message', message => {

	if(message.author.bot || !message.guild) return

fs.readFile(`./database.json`, `utf8`, (err, data) => {
	data = JSON.parse(data, null, 2)

if(data.users[message.author.id] == undefined) {
      data.users[message.author.id] = {"bio": `~Edit your bio with \`${config.prefix}set bio <text>\`\n~Edit your color with \`${config.prefix}set color <color>\` for $100`, "cash": 100, "color" : "36393E", "Name:": message.author.username, "dick" : randomInt(7) + 2 + `.${randomInt(9)}`, "daily" : 10, "item": "none", "cookies": 0, "cookietime": 10}
      fs.writeFile(`./database.json`, JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log(err);
      });
}
	if(message.content.indexOf(config.prefix) !== 0) return;


const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const cmd = args.shift().toLowerCase();

//--------------------------------------------- Commands

 if (cmd == "ping") {
   message.channel.send("pong!");
}

if (cmd == "say"){
	if (!args[0]) return message.channel.send("❌ You didn't give me anything to say!")
	message.channel.send(args.join(" "))
}

if (cmd == "sayd"){
	if (!args[0]) return message.channel.send("❌ You didn't give me anything to say!")
	message.channel.send(args.join(" "))
	message.delete()
}

if (cmd == "choose"){
	if (!args[1]) return message.channel.send("❌ You need to give me at least 2 options to choose from!")
	message.channel.send(args[Math.floor(Math.random()*args.length)])
}

if (cmd == "8ball"){
	if (!args[0]) return message.channel.send("❌ You didn't ask me anything!")
	const eightball = ["**{0}-Senpai has to concentrate and ask again :3**", "**Yes**", "**No**", "**I'm not sure, ask again**", "**Yes, definetly!**", "**Definetly not!**", "**Most likely**", "**Very unlikely**", "**It looks like it..**", "**Doesn't look like it...**", "**Of course!**", "**Of course not!**", "😴 ***Zzzz-* Huh? Oh come on, let me sleep!**", "**I'm busy, can't answer right now!**", "**Yep!**", "**Nope!**", "**Most likely**", "**Pretty unlikely**", "**Yeah!**", "**Nah...**", "**I think so**", "**I don't think so**", "Maybe not, but I think so", "Maybe, but I don't think so", "**I'd rather not answer that...**", "**Uhm, no?**", "**It's a yes!**", "**It's a no!**"]
	message.channel.send(eightball[Math.floor(Math.random()*eightball.length)])
}

const hugs = ["https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif", "https://m.popkey.co/32edb3/zE7XE.gif", "https://m.popkey.co/edbc5e/jZVdb.gif", "https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif", "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif", "https://media1.tenor.com/images/f2805f274471676c96aff2bc9fbedd70/tenor.gif?itemid=7552077", "https://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-19.gif", "https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif", "https://thumbs.gfycat.com/AlienatedUnawareArcherfish-max-1mb.gif", "https://m.popkey.co/fca5d5/bXDgV.gif", "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif", "http://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-4.gif", "https://gifimage.net/wp-content/uploads/2017/01/Anime-hug-GIF-Image-Download-7.gif", "https://78.media.tumblr.com/5b698824a746c5ca72253904eaef1883/tumblr_o19a4cWGhs1satyyro1_500.gif", "https://78.media.tumblr.com/f2a878657add13aa09a5e089378ec43d/tumblr_n5uovjOi931tp7433o1_500.gif", "https://i.pinimg.com/originals/f5/8d/c0/f58dc05305285aefd2efdb8b5671d2c8.gif", "http://media.tumblr.com/tumblr_m68m3wjllW1qewqw2.gif", "https://im-01.gifer.com/8X6d.gif", "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif", "https://i.imgur.com/rlOJqHL.gif", "https://i.imgur.com/ObUlwNQ.gif", "https://media1.tenor.com/images/b8b017d93d2e24d43f48ac6c63464a9c/tenor.gif", "http://gifimage.net/wp-content/uploads/2017/09/anime-hug-gif-2.gif"]

if (cmd == "hug"){
	if (!args[0]){
		message.channel.send("❌ You didn't tell me who you want to hug!")
	}
	else if (message.mentions.members.first() == undefined){
		message.channel.send("❌ I can't find that person :/")
	}
	else if (args[0] == message.author){
		hugembed = new Discord.RichEmbed()
		.setColor("FF77FF")
		.setTitle(`3: Aww, alone? You'll find someone special, I promise!`)
		.setImage("https://media2.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif")
		message.channel.send(hugembed)
	} else {
		hugembed = new Discord.RichEmbed()
		.setColor("FF77FF")
		.setTitle(`${message.author.username} just hugged ${message.mentions.members.first().displayName} 💗`)
		.setImage(hugs[Math.floor(Math.random()*hugs.length)])
		message.channel.send(hugembed)
	}
}

if (cmd == "gif"){
	if (!args[0]) return message.channel.send("❌ You didn't search for anything!")
	request(`https://api.giphy.com/v1/gifs/random?api_key=2xexEeGbWnApM3fs6suXKYAHC4iB1eB5&tag=${args.join("+")}&rating=pg-13`, {json: true}, function(error, response, body) {
		if (error){console.log(error)}
		if (!body.data.images) return message.channel.send("❌ I couldn't find anything fitting your search term :/")
		gifembed = new Discord.RichEmbed()
		.setColor("00ccff")
		.setTitle(body.data.title)
		.setImage(body.data.images.original.url)	
		.setFooter(new Date().toDateString())
		message.channel.send(gifembed)
	})
	
}

if (cmd == "avatar" || cmd == "pfp"){
    let user = message.mentions.users.first()
    if(!user) {
      user = message.member
    }
	if (!args[0]){user = message.author}
	else {user = message.mentions.members.first()}
	pfpembed = new Discord.RichEmbed()
	.setAuthor(bot.users.find('id', user.id).username + "'s Avatar:")
	.setImage(bot.users.find('id', user.id).avatarURL)	
	.setFooter(new Date().toDateString())
	message.channel.send(pfpembed)
}

if(message.content.startsWith(`${config.prefix}stalk`)) {
  	var usr = message.mentions.members.first()
  	if (!args[0]){message.channel.send("❌ You didn't give me anyone to stalk.")}
  	else if (usr == undefined){message.channel.send("❌ I can't find that person :/")}
  	else {embed = new Discord.RichEmbed()
  		.setColor(usr.displayHexColor)
    	.addField(`Status`, `${usr.presence.status}\n⁣`, true)
    	.addField(`Playing`, usr.presence.game !== null ? `${usr.presence.game.name}\n⁣` : `nothing\n⁣`, true)
    	.addField(`ID`, `${usr.user.id}\n⁣`, true)
    	.addField(`Joined "${message.guild.name}"`, usr.joinedAt.toDateString()+"\n⁣", true)
    	.addField(`On Discord since`, usr.user.createdAt.toDateString()+"\n⁣", true)
    	.addField(`Highest role`, usr.highestRole+"\n⁣", true)
    	.setTitle(`Now stalking ${usr.displayName}`, "⁣")
    	.setThumbnail(usr.user.avatarURL)
  		message.channel.send(embed)
  	}
}

if (cmd == "commands" || cmd == "cmds"){
	message.channel.send(`\`\`\`CSS
List of aviable commands:
(Prefix: ${config.prefix})

		 8ball : Answers questions
	avatar/pfp : Shows a users avatar
bet/$$$/gamble : Gamble with money
	       buy : Buy items from the shop
	    cookie : Give others a cookie
	     daily : Get your daily credits
	       gif : Searches for gifs
	      info : displays info aboout the bot
	    invite : Invite the bot to your server
   noodle/size : Learn about others noodle sizes
          ping : Pong!
       profile : Displays your profile
    resetcolor : Resets your profile color
           rob : Steal other's money
           say : Makes me say things
          sayd : Makes me say things, then delete your message
           set : Change profile settings
         stalk : Gets information about people

To view help for specific commands, do ${config.prefix}help <command>\`\`\``)
}

if (cmd == "info"){
	infoembed = new Discord.RichEmbed()
	.setColor("00ccff")
	.setAuthor("Acituanbot - V 1.0", "https://i.imgur.com/5MfY6QF.jpg")
	.addField("Info:", "This is a fun/economy/utilities bot in the **alpha state** developed by `Acituanbus.`\nIf you want to request a feature, fill out this form:\nhttps://goo.gl/forms/ha9CD6AG2C2MjfjE3\n⁣")
	.addField("Associated websites:", "https://www.youtube.com/Acituanbus\n⁣", true)
	.addField("Associated servers:", "discordapp.com/HpwxAnT\n⁣", true)
	.addField("Special thanks to", "`˗ˏˋ Søng ˊˎ˗#0666` and `Thijmen#7494`", true)
	.addField("Prefix:", `${config.prefix}\n⁣`, true)
	.setFooter("Made by Acituanbus#2729", "https://i.imgur.com/fAFm2e8.png")
	message.channel.send(infoembed)
}

if (cmd == "invite"){
	invembed = new Discord.RichEmbed()
	.setURL("https://goo.gl/zZVjLD") 
	.setTitle("Click here to invite me to your server!")
	message.channel.send(invembed)
}

//--------------------------------------------- Profile stuff

if (cmd == "profile"){
    let member = message.mentions.members.first()
    if(!member) {
      member = message.member
    }
    if(data.users[member.id] == undefined) {
    	data.users[member.id] = {"bio": `~Edit your bio with \`${config.prefix}set bio <text>\`\n~Edit your color with \`${config.prefix}set color <color>\` for $100`, "cash": 100, "color" : "36393E", "Name:": bot.users.find('id', member.id).username, "dick" : randomInt(7) + 2 + `.${randomInt(9)}`, "daily" : 10, "item": "none", "cookies": 0, "cookietime": 10}
      	fs.writeFile(`./database.json`, JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log(err);
      	});   
}
    else{
    	if (member.user.bot){message.channel.send("Bots don't have profiles!")}
    	else{
			profemb = new Discord.RichEmbed()
			.setThumbnail(bot.users.find('id', member.id).avatarURL)
			.setAuthor(`${bot.users.find('id', member.id).username}'s Profile\n⁣`, "https://i.imgur.com/4zvlRip.png")
			.setColor(data.users[member.id].color)
			.setTitle(`Bio:\n⁣`)
			.setDescription(`**${data.users[member.id].bio}**\n⁣`)
			.addField("Cash:\n⁣", "💰 $"+data.users[member.id].cash + "\n⁣", true)
			.addField("Cookies:", `🍪 ${data.users[member.id].cookies}\n⁣`, true)
			.addField("Noodle size:\n⁣", "📏 " + data.users[member.id].dick + " Inches\n⁣", true)
			.addField("Item equipped:\n⁣", data.users[member.id].item, true)
			//.addField("User:\n⁣", message.member.username)
			message.channel.send(profemb)
		}
	}
}

if (cmd == "$$$" || cmd == "gamble" || cmd == "bet"){
	//--checks if the user placed a viable bet
	if (args[0] == undefined || isNaN(args[0])){
		message.channel.send("❌ You need to bet at least $1!")
	}
	//--checks if the users cash is enough to bet
	else if (data.users[message.author.id].cash < parseInt(args[0])){
		message.channel.send("❌ You don't have enough money for that!")
	}
	//--makes sure no *bet -100 exploits can be used
	else if (parseInt(args[0]) < 0){
		message.channel.send("❌ You can't bet negative money!")
	}
	else if (parseInt(args[0]) > 500){
		message.channel.send("❌ You can't bet more than `$500!`")
	}
	//--uses a function defined above to get a random number between 0 and 100, then tests if its 75 or more
	else if (randomInt(100) >= 75){
		let amount = parseInt(args[0])
		//--multiplies the set amount by 2
		let win = amount*2
		//--adds the money to the users profile
        data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) + win
		message.channel.send("🎉 You won! I added `$"+ win + "` to your profile!")
    } else {
		let amount = parseInt(args[0])
    	let loss = amount
    	//--removes the lost money from the users profile
        data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) - loss
        message.channel.send("👎 You lost! I removed `$" + loss+ "` from your profile!")
	}
}

if (cmd == "rob"){
	//--checks if a user was mentioned, if that user is in the database and if the amount is a number
	if (!args[0]){message.channel.send("❌ You didn't specify a victim!")}
	else if (message.mentions.members.first() == message.member) {message.channel.send("❌ You can't rob yourself!")}
	else if (message.mentions.members.first() == undefined || data.users[message.mentions.members.first().id] == undefined){message.channel.send("❌ I can't find that victim in my database! :/ (Do \`;profile <user>\` to generate the profile for them)")}
	else if (!args[1] || isNaN(args[1])){
		message.channel.send("❌ You have to specify how much you want to steal in numbers!")
	} else {
		//--checks if the amount is from $1-$50 and if both users have enough money
		if (parseInt(args[1]) < 1) {message.channel.send("❌ You have to rob at least $1!")}
		else if (parseInt(args[1]) > 30) {message.channel.send("❌ You can't rob more than $30!")}
		else if (data.users[message.author.id].cash < parseInt(args[1] || 1)){message.channel.send("❌ You don't have enough money for that!")}
		else if (data.users[message.mentions.members.first().id].cash < parseInt(args[1])){message.channel.send("❌ Your victim doesn't have that much money!")}
		else {
			//--checks if a weapon was used, if not it sets it to none 
			if (!args[2]){
				var item = "none"
				var chance = "75"
				var possible = true
			}
			else {
				//--if there was something used, it checks to see wether it was a Gun or Knife, or something else
				switch (args[2]){
				case"knife":
					if (data.users[message.author.id]. item == "Knife"){
						var item = "Knife"
						var chance = "60"
						var possible = true
						break;
					}
					else {
						message.channel.send(`❌ You don't have a Knife!`)
						var possible = false
						break;
					}
				case"gun":
					if (data.users[message.author.id].item == "Gun"){
						var item = "Gun"
						var chance = "50"
						var possible = true
						break;
					}
					else {
						message.channel.send(`❌ You don't have a Gun!`)
						var possible = false
						break;
					}
				default:
					message.channel.send(`❌ There's no item called ${args[2]}!`)
					break;
				}			
			}
			//--chance depending on the weapon used for a successful robbery: 
			var score = randomInt(100)
			if (score >= chance && possible){
				data.users[message.mentions.members.first().id].cash = data.users[message.mentions.members.first().id].cash - parseInt(args[1])
				data.users[message.author.id].cash = data.users[message.author.id].cash + parseInt(args[1])
				//--if there was no weapon used:
				if (item == "none"){
					var author = `${message.author.username}`
					var desc = `just stole $${parseInt(args[1])} from **${message.mentions.members.first().displayName}** with their bare hands!\n⁣`
					var itemurl = "https://www.madcatmarketing.co.uk/wp-content/uploads/2014/10/Bloody-hand-print-on-transparent-background.png"
					var col = "00ff32"
				}
				//--if there was a weapon used:
				else if (item != "none") {
					var author = `${message.author.username}`
					var desc = `just stole $${parseInt(args[1])} from **${message.mentions.members.first().displayName}** with a ${item}!\n⁣`
					var col = "00ff32"
					if (item == "Knife"){var itemurl = "https://i.imgur.com/m9mETqB.png"}
					else if (item == "Gun"){var itemurl = "https://i.imgur.com/adCJMU1.png"}
				}
				if(message.author.avatarURL == null){var authorurl = "https://i.imgur.com/AanCcQ1.png"}
				else {var authorurl = `${message.author.avatarURL}`}
				robembed = new Discord.RichEmbed()
				.setAuthor(author, authorurl)
				.setDescription(desc)
				.addField("Score:", `${score}/${chance}` )
				.setColor(col)
				.setThumbnail(itemurl)
				message.channel.send(robembed)
			} else {
				//--if the robbery was unsuccessful but there was a weapon used
				if (possible){
					data.users[message.author.id].cash = data.users[message.author.id].cash - parseInt(args[1])
					//--if there was no weapon used:
					if (item == "none"){
						var author = `${message.author.username}`
						var desc = `tried stealing $${parseInt(args[1])} from **${message.mentions.members.first().displayName}** with their bare hands and failed!\n⁣`
						var itemurl = "https://www.madcatmarketing.co.uk/wp-content/uploads/2014/10/Bloody-hand-print-on-transparent-background.png"
						var col= "bf0000"
					}
					//--if there was a weapon used:
					else if (item != "none"){
						var author = `${message.author.username}`
						var desc = `tried stealing $${parseInt(args[1])} from **${message.mentions.members.first().displayName}** with a ${item} and failed!\n⁣`
						var col = "bf0000"
						if (item == "Knife"){var itemurl = "https://i.imgur.com/m9mETqB.png"}
						else if (item == "Gun"){var itemurl = "https://i.imgur.com/adCJMU1.png"}
					}
					if(message.author.avatarURL == null){var authorurl = "https://i.imgur.com/AanCcQ1.png"}
					else {var authorurl = `${message.author.avatarURL}`}
					robembed = new Discord.RichEmbed()
					.setAuthor(author, authorurl)
					.setDescription(desc)
					.addField("Score:", `${score}/${chance}` )
					.setColor(col)
					.setThumbnail(itemurl)
					message.channel.send(robembed)
				}
			}
		}
	}
}

if (cmd == "set"){
	//--tests for different set arguments
	switch(args[0]){
	case"color":
	if (args[1] < 0){
		message.channel.send("❌ Please use a hex-value or a pre-defined color!")
		break;
	}
	//--tests for different pre-defined colors
		switch (args[1]){
			case"red": 
				var profcolor = "FF0000"
				break;
			case"orange":
				var profcolor = "FF5000"
				break;
			case"yellow":
				var profcolor = "FFFF00"
				break;				
			case"green":
				var profcolor = "009900"
				break;
			case"lightgreen":
				var profcolor = "00FF00"
				break;
			case"blue":
				var profcolor = "0000FF"
				break;
			case"lightblue":
				var profcolor = "00AAFF"
				break;
			case"white":
				var profcolor = "FFFFFF"
				break;
			default:
				var profcolor = args[1]
		}
		//--if no color is given:
		if (profcolor == undefined){
			message.channel.send("❌ You need to either use a predefined color or give me a hex color to change it to! (For example __0000ff__)")
		}
		//--tests if the user has enough money
		else if (data.users[message.author.id].cash < 100){
			message.channel.send("❌ You need at least $100 to buy this.")
		} else {
			//--removes the money from the users profile
			data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) - 100
			//--sets the profile color to the specified value
			data.users[message.author.id].color = profcolor
			//--sends a confirmation message
			colembed = new Discord.RichEmbed()
			.setColor(profcolor)
			.setTitle(profcolor)
			.setDescription("✅ I updated your profile color for `$100`!")
			message.channel.send(colembed)
		}
		break;
	case"bio":
		//--makes sure people give a text to setthe bio to
		if (!args[1]){
			message.channel.send("❌ You need to tell me what to set your bio to!")
		} else {
			//--saves the specified bio to the users profile
			let bio = args.slice(1).join(" ")
			if(args.slice(1).join(" ").length > 500){
				message.channel.send("❌ That bio is too long! (Max 500 characters)")
			} else{
				data.users[message.author.id].bio = bio
				message.channel.send("✅ I sucessfully updated your bio!")
			}
		}
		break;
	default:
			message.channel.send("❌ You need to tell me what you want to change!")
	}
}

if (cmd == "buy"){
	if (!args[0]){message.channel.send("What do you want to buy?\nAviable items: `knife`, `gun`")}
	else{
		switch(args[0]){
			case"knife":
				if (data.users[message.author.id].cash < 250){message.channel.send("❌ You need at least $250 to buy this.")}
				else {
					data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) - 250
					data.users[message.author.id].item = "Knife"
					message.channel.send("✅ Set your weapon to **Knife** for `$250`.")
				}
				break;
			case"gun":
				if (data.users[message.author.id].cash < 500){message.channel.send("❌ You need at least $500 to buy this.")}
				else {
					data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) - 500
					data.users[message.author.id].item = "Gun"
					message.channel.send("✅ Set your weapon to **Gun** for `$500`.")
				}
				break;
			default:
					message.channel.send("❌ You can't buy that!")
		}
	}
}

if (cmd == "resetcolor"){
	let profcolor = data.users[message.author.id].color
	if (profcolor == "36393E"){
		message.channel.send("❌ Your profile color isn't modified.")
	} else {
		data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) + 50
		data.users[message.author.id].color = "36393E"
		message.channel.send("✅ I reset your profile color and added `$50` to your account.")
	}
}

if (cmd == "money"){
	let amount = args[0]
	if (!amount){
		message.channel.send("❌ You need to tell me how much you want!")
	}
	else if (message.author.id != "180995521622573057"){
		message.channel.send("❌ You don't have permission to use this command!")
	} else {
		data.users[message.author.id].cash = amount
		message.channel.send("✅ I set your money to `$" + amount + "`!")
	}
}

if (cmd == "noodle" || cmd == "size"){
	if (!args[0]){
		user = message.author
		message.channel.send(`${user.username}'s noodle is **` + data.users[user.id].dick + " inches** long!")
	} else {
		user = message.mentions.members.first()
		if(data.users[user.id] == undefined) {
			message.channel.send(`❌ I can't find that user in my database :/ (Do \`;profile <user>\` to generate the profile for them)`)	
		} else {
			message.channel.send(`${user.displayName}'s noodle is **` + data.users[user.id].dick + " inches** long!")			
		}
	}
}

if(cmd === "daily") {
	if(data.users[message.author.id].daily == new Date().getDay()) return message.channel.send("❌ You can only do this once a day!");
	data.users[message.author.id].daily = new Date().getDay()
	dailies = randomInt(100) + 100
	data.users[message.author.id].cash = parseInt(data.users[message.author.id].cash) + dailies
	message.channel.send(`💰 | ${message.member.displayName}, you got your **${dailies}** daily credits! Come back tomorrow to get more!`) 
}

if(cmd === "cookie") {
	if(data.users[message.author.id].cookietime == new Date().getDay()) return message.channel.send("❌ You can only give one cookie a day!");
	else if (!message.mentions.members.first()){message.channel.send("❌ You need to mention the person you want to give the cookie to!")}
	else if (message.mentions.members.first() == message.member){message.channel.send("You can't give yourself a cookie!")}
	else if (data.users[message.mentions.members.first().id] == undefined){message.channel.send("❌ I can't find that user in my database :/ (Do \`;profile <user>\` to generate the profile for them)")}
	else {
		data.users[message.author.id].cookietime = new Date().getDay()
		data.users[message.mentions.members.first().id].cookies = parseInt(data.users[message.mentions.members.first().id].cookies) + 1
		message.channel.send(`🍪 <@${message.mentions.members.first().id}> got a cookie from **${message.author.username}**!`)
	}
}

//--------------------------------------------- Help

if (cmd == "help"){
	if (!args[0]){message.channel.send(`What do you need help with? Do \`${config.prefix}help <command>\` to recieve help for a specific command or \`${config.prefix}commands\` to view all aviable commands.\nYou can also do \`${config.prefix}help economy\` for some basic info on economy commands.`)}
	else {
		switch (args[0]){
		case"stalk":
			var head = `Showing help for: ${config.prefix}stalk\n`
			var desc = `Use \`${config.prefix}stalk <user-mention>\` to view information about a specific person in the server.`
			sendhelp2(message, head, desc);
			break;
		case"gif":
			var head = `Showing help for: ${config.prefix}gif\n`
			var desc = `Use \`${config.prefix}gif <search term>\` for me to search for cool gifs.`
			sendhelp2(message, head, desc);
			break;
		case"say":
			var head = `Showing help for: ${config.prefix}say\n⁣`
			var desc = `Use \`${config.prefix}say <text>\` to make me say anything you want.`
			sendhelp2(message, head, desc);
			break;
		case"sayd":
			var head = `Showing help for: ${config.prefix}sayd\n⁣`
			var desc = `Use \`${config.prefix}sayd <text>\` to make me say anything you want and delete you message.`
			sendhelp2(message, head, desc);
			break;
		case"8ball":
			var head = `Showing help for: ${config.prefix}8ball\n⁣`
			var desc = `Use \`${config.prefix}8ball <question>\` for me to answer all your questions.`
			sendhelp2(message, head, desc);
			break;
		case"gamble":
			var head = `Showing help for: ${config.prefix}gamble\n⁣`
			var desc = `Use \`${config.prefix}$$$ <amount>\` / \`${config.prefix}gamble <amount>\` / \`${config.prefix}bet <amount>\` to either gain twice the amount you bet (25% chance) or lose your money (75% chance)`
			sendhelp2(message, head, desc);
			break;
		case"$$$":
			var head = `Showing help for: ${config.prefix}$$$\n⁣`
			var desc = `Use \`${config.prefix}$$$ <amount>\` / \`${config.prefix}gamble <amount>\` / \`${config.prefix}bet <amount>\` to either gain twice the amount you bet (25% chance) or lose your money (75% chance)`
			sendhelp2(message, head, desc);
			break;
		case"bet":
			var head = `Showing help for: ${config.prefix}bet\n⁣`
			var desc = `Use \`${config.prefix}$$$ <amount>\` / \`${config.prefix}gamble <amount>\` / \`${config.prefix}bet <amount>\` to either gain twice the amount you bet (25% chance) or lose your money (75% chance)`
			sendhelp2(message, head, desc);
			break;
		case"set":
			var head = `Showing help for: ${config.prefix}set\n⁣`
			var desc = `Use \`${config.prefix}set color <hex-value | pre-defined color>\`\nto set your profile color for $100\n\nUse \`${config.prefix}bio <text>\` to set your bio on your profile.\n⁣`
			var optional1 = "Pre-Defined colors:"
			var optional2 = "red, orange, green, lightgreen, blue, lightblue, black, white"
			sendhelp(message, head, desc, optional1, optional2);
			break;
		case"resetcolor":
			var head = `Showing help for: ${config.prefix}resetcolor\n⁣`
			var desc = `Use \`${config.prefix}resetcolor\` to reset your profiles color and get $50 back`
			sendhelp2(message, head, desc);
			break;
		case"gif":
			var head = `Showing help for: ${config.prefix}gif\n⁣`
			var desc = `Use \`${config.prefix}gif <search term>\` to search for gifs on giphy`
			sendhelp2(message, head, desc);
			break;
		case"noodle":
			var head = `Showing help for: ${config.prefix}noodle\n⁣`
			var desc = `Use \`${config.prefix}noodle (<user-mention>)\` or \`${config.prefix}size (<user-mention>)\` to learn about others noodle sizes`
			sendhelp2(message, head, desc);
			break;
		case"size":
			var head = `Showing help for: ${config.prefix}size\n⁣`
			var desc = `Use \`${config.prefix}size (<user-mention>)\` or ${config.prefix}noodle (<user-mention>)\` to learn about others noodle sizes`
			sendhelp2(message, head, desc);
			break;
		case"rob":
			var head = `Showing help for: ${config.prefix}rob\n⁣`
			var desc = `Use \`${config.prefix}rob <user-mention> <amount> (<weapon>)\` to try and steal others money!\n⁣`
			var optional1 = "Chances:"
			var optional2 = "Hands: 25%\nKnife: 40%\nGun: 50%"
			sendhelp(message, head, desc, optional1, optional2);
			break;
		case"profile":
			var head = `Showing help for: ${config.prefix}profile\n⁣`
			var desc = `Use \`${config.prefix}profile (<user-mention>)\` to view your or another persons profile! This also generates new profiles if no existing one was found.`
			sendhelp2(message, head, desc);
			break;
		case"buy":
			var head = `Showing help for: ${config.prefix}buy\n⁣`
			var desc = `Use \`${config.prefix}buy <item>\` to buy a specific item from the shop.\n⁣`
			var optional1 = "Aviable items:"
			var optional2 = "gun, knife"
			sendhelp(message, head, desc, optional1, optional2);
			break;
		case"pfp":
			var head = `Showing help for: ${config.prefix}pfp\n⁣`
			var desc = `Use \`${config.prefix}pfp (<user-mention>)\` or \`${config.prefix}avatar (<user-mention>)\` to view a persons profile picture.⁣`
			sendhelp2(message, head, desc);
			break;
		case"avatar":
			var head = `Showing help for: ${config.prefix}avatar\n⁣`
			var desc = `Use \`${config.prefix}avatar (<user-mention>)\` or \`${config.prefix}pfp (<user-mention>)\` to view a persons avatar.⁣`
			sendhelp2(message, head, desc, optional1, optional2);
			break;
		case"cookie":
			var head = `Showing help for: ${config.prefix}cookie\n⁣`
			var desc = `Use \`${config.prefix}avatar (<user-mention>)\` to give someone a cookie.⁣`
			sendhelp2(message, head, desc, optional1, optional2);
			break;
		case"economy":
			overembed = new Discord.RichEmbed()
			.setColor("00ccff")
			.setTitle(`Showing economy overview\n⁣`)
			.setDescription(`Economy commands:`)
			.addField(`${config.prefix}buy`, "Buy items from the shop\nthat you can use wit hother commands.\n⁣", true)
			.addField(`${config.prefix}cookie 🍪`, "Give other users a cookie once a day.\nActs as reputation points.\n⁣", true)
			.addField(`${config.prefix}daily 💰`, "Get 100-200 credits. Can be\nused once a day\n⁣", true)
			.addField(`${config.prefix}noodle / ${config.prefix}size 📏`, "Shows a users noodle size.\n⁣", true)
			.addField(`${config.prefix}profile`, "Shows a users profile or generates a\nnew one if none was found.\n⁣", true)
			.addField(`${config.prefix}set`, "Allows you to modify your profile.\n⁣", true)
			.addField(`${config.prefix}resetcolor`, "Resets your profile color and adds $50 to your account.\n⁣")
			.addField(`${config.prefix}rob`, "Steal other peoples money. You can use weapons\nfrom the shop for a better chance of sucess.\n⁣")
			message.channel.send(overembed);
			break;
		default:
			message.channel.send(`There's no help aviable for this command. Possible reasons:\n\`\`\`CSS\n-it doesn't require addidional arguments\n-there's no further information aviable\n-it doesn't exist\n\`\`\``)
			break;
		}
	}
}


fs.writeFile(`./database.json`, JSON.stringify(data, null, 2), function (err) {
	if (err) return console.log(err)
})
})
})

//---------------------------------------------

function sendhelp(message, head, desc, optional1, optional2) {
	helpembed = new Discord.RichEmbed()
	.setColor("F68919")
	.addField("\n⁣", desc, true)
	.addField(optional1, optional2)
	.setTitle(head)
	.setThumbnail(`https://i.imgur.com/ptRsPrK.png`)
	message.channel.send(helpembed)
}
function sendhelp2(message, head, desc) {
	helpembed = new Discord.RichEmbed()
	.setColor("F68919")
	.addField("\n⁣", desc, true)
	.setTitle(head)
	.setThumbnail(`https://i.imgur.com/ptRsPrK.png`)
	message.channel.send(helpembed)
}

//--------------------------------------------- Welcome msgs

bot.on("guildMemberAdd", (member) => {
	if (member.guild.id != "180995718461259776"){}
	else{
		joinembed = new Discord.RichEmbed()
		.setColor("00cc00")
		.setAuthor(`Member joined!`, `${bot.users.find('id', member.id).avatarURL}`)
		.setDescription(`**${(bot.users.find('id', member.id).username)}** just joined ${member.guild.name}! Have a good time and read the rules! <:peeper:231404595660849152>`)
		.setFooter(`Member count: ${member.guild.members.size}\``)
		bot.channels.get("257063802598588417").send(joinembed)
	}
});

bot.on("guildMemberRemove", (member) => {
	if (member.guild.id != "180995718461259776"){}
	else{
		leaveembed = new Discord.RichEmbed()
		.setColor("cc0000")
		.setAuthor(`Member left!`, `${bot.users.find('id', member.id).avatarURL}`)
		.setDescription(`**${(bot.users.find('id', member.id).username)}** just disappeared into the void! Bye bye... 😦`)
		.setFooter(`Member count: ${member.guild.members.size}`)
		bot.channels.get("257063802598588417").send(leaveembed)
	}
});

bot.on("guildCreate", guild => {
	joinedembed = new Discord.RichEmbed()
	.setColor("00ccff")
	.setAuthor("Acituanbot V-1.0", "https://i.imgur.com/5MfY6QF.jpg")
	.setTitle("Hey!")
	.setDescription(`I'm Acibot!\nThanks for adding me to your server! I'm constantly being updated and new commands and features get added all the time!\nDo \`${config.prefix}cmds\` to check all of my commands, or \`${config.prefix}info\` for general information! :D\n⁣`)
	.addField("You can help!", `If you want to help me out, tell your\nfriends about me and send them this link:\nhttps://goo.gl/zZVjLD\n⁣`)
	.addField("Want to request a feature?", "If you have an idea for a feature,\nthat you would love me to have, click this link:\nhttps://goo.gl/4wge9f\n⁣")
	.addField("Thanks a bunch", "for adding me to your server!")
	.setFooter("Made by Acituanbus#2729", "https://i.imgur.com/fAFm2e8.png")
	guild.defaultChannel.send(joinedembed)


	addembed = new Discord.RichEmbed()
	.setColor("11ff22")
	.setThumbnail(guild.iconURL)
	.setAuthor(`Joined a server:`, `https://i.imgur.com/69DSuf8.png`)
	.setTimestamp()
	.addField(`Server info:`, `Name: **${guild.name}**\nid: \`${guild.id}\`\nOwner: **${guild.owner}**\nRegion: **${guild.region}**\nMembers: **${guild.memberCount}**`)
	bot.channels.get("421751752652488704").send(addembed)
  	bot.user.setPresence({game: {name: `over ${bot.guilds.size} servers`, type: 3}})
});

bot.on("guildDelete", guild => {
	removeembed = new Discord.RichEmbed()
	.setColor("FF1122")
	.setThumbnail(guild.iconURL)
	.setAuthor(`Left a server:`, `https://i.imgur.com/8CXsPC6.png`)
	.addField(`Server info:`, `Name: **${guild.name}**\nid: \`${guild.id}\`\nOwner: **${guild.owner}**\nRegion: **${guild.region}**\nMembers: **${guild.memberCount}**`)
	.setTimestamp()
	bot.channels.get("421751752652488704").send(removeembed)
  	bot.user.setPresence({game: {name: `over ${bot.guilds.size} servers`, type: 3}})
});

//this will run the code with our bot
bot.login(config.token)