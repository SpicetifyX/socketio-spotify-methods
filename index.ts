import { createServer } from "http";
import { Server } from "socket.io";
import RemoteClient from "./client";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  console.log("Spicetify client connected");

  const client = new RemoteClient(socket);

  const config = await client.getConfig();
  console.log(config);

  const themes = [
    [
      "https://raw.githubusercontent.com/SpicetifyX/themes/refs/heads/main/SpicetifyX/user.css",
      "https://raw.githubusercontent.com/SpicetifyX/themes/refs/heads/main/SpicetifyX/color.ini",
      "SpicetifyX",
      "main",
    ],
    [
      "https://raw.githubusercontent.com/SpicetifyX/themes/acca146ebe3e70cf2958017988366aa377b90c5e/SpicetifyX/user.css",
      "https://raw.githubusercontent.com/SpicetifyX/themes/acca146ebe3e70cf2958017988366aa377b90c5e/SpicetifyX/color.ini",
      "SpicetifyX",
      "main",
    ],
    [
      "https://raw.githubusercontent.com/catppuccin/spicetify/refs/heads/main/catppuccin/user.css",
      "https://raw.githubusercontent.com/catppuccin/spicetify/refs/heads/main/catppuccin/color.ini",
      "catppuccin",
      "mocha",
    ],
  ];

  for (const theme of themes) {
    client.removeThemes();
    client.injectTheme(theme[0]!, theme[1]!, theme[2]!, theme[3]!);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  // client.removeThemes();

  client.on("songchange", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(3000, () => {
  console.log("Started socketio server");
});
