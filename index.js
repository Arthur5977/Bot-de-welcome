const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Nell Seu Ajudante ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}My Creator Itachi#0002`,
      `${client.guilds.cache.size} servers!`,
      `${client.channels.cache.size} channels!`,
      `${client.users.cache.size} users!`,
      `My Creator Itachi#0002`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("Nell Seu Ajudanre!")
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'Nell')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    return message.channel.send(`🔮 | Olá ${message.author}, veja meus comandos com **${config.prefix}help**!`)
    }
    });

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("id do servidor");
  let channel = await client.channels.cache.get("id do canal");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Entrou");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(member.user.tag , member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas ${emoji}`)
      .setImage("https://tse4.mm.bing.net/th?id=OIP.3PFQJEbM2JBQeJa-nL6a6wHaE-&pid=Api&P=0&w=238&h=161")
      .setDescription(`**${member.user}**, Bem vindo ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Meu criador Itachi#0002")
      .setTimestamp();

    channel.send(embed);
  }
});

client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("id do servidor");
  let channel = await client.channels.cache.get("id do canal");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Saiu");
  if (guild != member.guild) {
    return console.log("Goodbye.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Adeus! ${emoji}`)
      .setImage("https://tse2.mm.bing.net/th?id=OIP.IF9OH8Y6kt2S-bfJG2Iw3gHaEK&pid=Api&P=0&w=276&h=156")
      .setDescription(`**${member.user.username}**, Espero que se divirta em outro servidor igual a este. :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Meu criador Itach#0002")
      .setTimestamp();

    channel.send(embed);
  }
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token
