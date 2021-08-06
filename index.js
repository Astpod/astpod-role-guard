const { Client, Discord, MessageEmbed } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const fs = require("fs");
const cfg = require("./config.json");
const ms = require("ms")
global.cfg = cfg;
global.client = client;

fs.readdir("./events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

client.on("message", async message => {
    const prefikslerim = ["g?", "g.", "g!", "!", ".", "?"];
    let ast = false;
    for (const içindeki of prefikslerim) {
      if (message.content.startsWith(içindeki)) ast = içindeki;
    }
    if (!ast) return;
    const args = message.content.slice(ast.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const event = message.content.toLower;
    const split = message.content.split('"');
    switch (command) {
      case "eval":
      case "hewal":
      if(!cfg.owner.includes(message.author.id)) return;
      if (args.join(" ").toLowerCase().includes('token')) return message.channel.send("Token yokk")
      const clean = text => {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      }
      try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        await message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
      break;
        case "list":
        case "liste":
        if(!cfg.safe.includes(message.author.id)) return;
          let safex = cfg.safe || [];
          const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`Sunucumuzdaki Guard güvenli listesi:\n
**❯ Guard Güvenli listesi: **(${cfg.safe.size} Üye)**
\`❯\` Not: Guard güvenli listesinde bulunan kullanıcılar yaptıgı her şeyden etkilenmicektir. \n
${safex.map(astsex => `<@${astsex}> - (\`${astsex}\`)`).join("\n")}
`)
  message.channel.send(embed)
          break;
    }
  })

client.on("disconnect", () => console.log("1 Bot bağlantısı kesildi"))
client.on("reconnecting", () => console.log("1 Bot tekrar bağlanıyor..."))
client.on("error", e => console.log(e))
client.on("warn", info => console.log(info));

client.login(cfg.token)
.then(x => console.log("Tokenim kalktı"))
.catch(x => console.error("Tokenim indi"))
