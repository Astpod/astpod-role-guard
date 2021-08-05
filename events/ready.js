const cfg = require("../config.json")
const client = global.client;
module.exports = () => {
  console.log("Guard aktif!");
  setInterval(() => {
  const reloadStatus = Math.floor(Math.random() * (cfg.status.length));
  client.user.setActivity(`${cfg.status[reloadStatus]}`);
  }, 60000)
  const x = client.channels.cache.get(cfg.sesKanalı)
  if(x) x.join().catch(e => console.error("Guard ses kanalına bağlanamadı"))
}
module.exports.configuration = {
  name: "ready"
}