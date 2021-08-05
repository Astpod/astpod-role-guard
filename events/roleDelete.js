const cfg = require("../config.json")
const client = global.client;
const x = require("../functions.js")
module.exports = async (role) => {

let entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit.entries.first())
if (Date.now() - entry.createdTimestamp > 5000) return;
if(cfg.safe.includes(entry.executor.id)) return;
if(cfg.botsafe.includes(entry.executor.id)) return;
if(cfg.owner.includes(entry.executor.id)) return;

await role.guild.members.ban(entry.executor.id, {
    reason: "Sunucuda izinsiz rol silmek"
}).catch(e => console.error("Kullanıcıyı banlamaya yetkim yetmiyor."))

client.channels.cache.get(cfg.rolsilmelog).send(`**${entry.executor.tag}** adlı kişi sunucumuzda bulunan \`${role.name}\` (\`${role.id}\`) adlı rolü sildi ve banlandı.`)

x.ytKapat(cfg.sunucuID)

}

module.exports.configuration = {
    name: "roleDelete"
}