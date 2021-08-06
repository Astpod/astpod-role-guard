const cfg = require("../config.json")
const client = global.client;
module.exports = async (oldRole, newRole) => {

let entry = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" }).then(audit => audit.entries.first())
if (Date.now() - entry.createdTimestamp > 5000) return;
if(cfg.safe.includes(entry.executor.id)) return;
if(cfg.botsafe.includes(entry.executor.id)) return;
if(cfg.owner.includes(entry.executor.id)) return;
if (oldRole.permissions !== newRole.permissions) {
    
await newRole.guild.members.ban(entry.executor.id, {
    reason: "Sunucuda izinsiz rol güncellemek"
}).catch(e => console.error("Kullanıcıyı banlamaya yetkim yetmiyor."))

newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
});

await client.channels.cache.get(cfg.rolgüncellemelog).send(`**${entry.executor.tag}** adlı kişi sunucumuzda bulunan \`${newRole.name ? newRole.name : "Rol bulunamadı"}\` (\`${newRole.id ? newRole.id : "Rol ID bulunamadı"}\`) adlı rolü güncelledi ve banlandı.`)

await client.ytKapat(cfg.sunucuID)
}

if (newRole.position !== oldRole.position) {
    
    await newRole.guild.members.ban(entry.executor.id, {
      reason: "İzinsiz Rolün yerini değiştirdi."
    }).catch(e => console.error("Kullanıcıyı banlamaya yetkim yetmiyor."))
    
    await newRole.setPosition(oldRole.position)
    
    await client.ytKapat(cfg.sunucuID)
    
    await client.channels.cache.get(cfg.rolgüncellemelog).send(`**${entry.executor.tag}** adlı kişi sunucumuzda bulunan rollerin yerini güncelledi ve banlandı.`)
}
}

module.exports.configuration = {
    name: "roleUpdate"
}
