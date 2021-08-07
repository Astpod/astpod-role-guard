const cfg = require("./config.json")
module.exports = () => {
 
client.ytKapat = async function (guild) => {
    guild.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
        await r.setPermissions(0);
    });
    client.channels.cache.get(cfg.ytkapatmalog).send(`Sunucumuzun **Yönetici, Sunucuyu Yönet, Rol Yönet, Webhookları Yönet** olan rolleri kapattım. Sunucuyu güvene aldım.`)
 }

}
