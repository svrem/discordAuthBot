const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client();

let channelNames = [];

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  let mod = message.guild.roles.cache.find((role) => role.name === "Moderator");

  const messageSplit = message.content.split(" ");

  if (messageSplit[0] === "!auth") {
    if (message.member.roles.cache.has(mod.id)) {
      console.log("wow admin");
      message.member.addRole(mod);

      if (messageSplit[1] === "add-admin") {
        if (client.users.cache.get(messageSplit[2]) && false) {
          const user = client.users.cache.get(messageSplit[2]);

          user.roles.add(mod).catch(console.error);

          message.channel.send(
            `Added User ${client.users.cache.get(messageSplit[2])} to admins!`
          );
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
