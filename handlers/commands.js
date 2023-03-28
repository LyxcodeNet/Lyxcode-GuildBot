const { dirLoader } = require("../functions/dirLoader");

async function loadCommands(client) {  
  console.time("Commands Loaded");

  const files = await dirLoader("/features/commands");

  client.commands = new Map();

  const commandsArray = new Array();
  const commands = new Array();

  for (const file of files) { 
    try { 
      const command = require(file);
      client.commands.set(command.data.name, command);
  
      commandsArray.push(command.data.toJSON());
  
      commands.push({ Event: command.data.name, Status: "✅" });
    } catch (error) {
      commands.push({ Event: file.split("/").pop().slice(0, -3), Status: "🛑" });
      console.log(error)
    }
  }

  client.application.commands.set(commandsArray);

  console.table(commands, ["Event", "Status"]);
  console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events.");
  console.timeEnd("Commands Loaded");
}
  
module.exports = { loadCommands };