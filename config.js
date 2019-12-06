
let config={};
//CONFIG
config.server = {
  flavor: 'spigot',
  core: {
    jar: './spigot/spigot-1.12.jar',
    args: ['-Xmx2G'],
    rcon: {
      port: '25575',
      password: 'password'
    }
  }
};
config.port = 3000
//CONFIG
module.exports = config;