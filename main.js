const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client();

let channelNames = [];
let admins;
fs.readFile("admins.json", "utf8", (err, data) => {
  admins = JSON.parse(data);
  main();
});

const main = () => {
  let mod = message.guild.roles.cache.find((role) => role.name === "Moderator");

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.on("message", (message) => {
    console.log(message.channel.name);
    const messageSplit = message.content.split(" ");
    console.log(messageSplit);

    if (messageSplit[0] === "!auth") {
      if (message.member.roles.cache.has(mod.id)) {
        console.log("wow admin");

        if (messageSplit[1] === "add-admin") {
          if (client.users.cache.get(messageSplit[2])) {
            admins.push(messageSplit[2]);
            message.channel.send(
              `Added User ${client.users.cache.get(messageSplit[2])} to admins!`
            );

            fs.writeFile("admins.json", JSON.stringify(admins), (err) => {
              console.log(err);
            });
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
};
