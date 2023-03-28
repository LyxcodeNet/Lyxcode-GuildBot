const { loadCommands } = require("../../../handlers/commands");
module.exports = {
    name: "ready",
    execute(client) {
        
        loadCommands(client)
        console.log(`Logged in as ${client.user.tag}`);
    }
}