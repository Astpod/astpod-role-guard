const cfg = require("../config.json")
const client = global.client;
module.exports = async (oldMember, newMember) => {

let entry = await newMember.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first())
if (Date.now() - entry.createdTimestamp > 5000) return;
if(cfg.safe.includes(entry.executor.id)) return;
if(cfg.botsafe.includes(entry.executor.id)) return;
if(cfg.owner.includes(entry.executor.id)) return;
let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD"]
if (arr.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
await newMember.roles.set(oldMember.roles.cache.map(r => r.id));
await newMember.guild.members.ban(entry.executor.id, {
    reason: "Sunucuda izinsiz sağ tık rol vermek"
}).catch(e => console.error("Kullanıcıyı banlamaya yetkim yetmiyor."))

await client.channels.cache.get(cfg.rolvermelog).send(`**${entry.executor.tag}** adlı kişi sunucumuzda bulunan \`${newMember ? newMember : "Kullanıcı bulunamadı"}\` (\`${newMember.id}\`) adlı kullanıcıya yasaklı rol verdi ve banlandı.`)
}

}

module.exports.configuration = {
    name: "guildMemberUpdate"
}
