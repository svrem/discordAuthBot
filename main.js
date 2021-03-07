const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client();

let channelNames = [];
let admins = fs.readFile("./admins.json", (err, data) => {
  return data;
});

console.log(data);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  console.log(message.channel.name);
  const messageSplit = message.content.split(" ");
  console.log(messageSplit);

  if (messageSplit[0] === "!auth") {
    if (admins.includes(message.author.id)) {
      console.log("wow admin");

      if (messageSplit[1] === "add-admin") {
        if (client.users.cache.get(messageSplit[2])) {
          admins.push(messageSplit[2]);
          message.channel.send(
            `Added User ${client.users.cache.get(messageSplit[2])} to admins!`
          );
          console.log(admins);
        } else {
          message.channel.send("Can't find user!");
        }
      }
    } else {
      message.channel.send("Insignificant authentication");
    }
  }
});
// console.log(process.env);
client.login(process.env.token);
