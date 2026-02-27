import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Spicetify client connected");

  socket.emit("get-config");

  socket.on("get-config", (msg) => {
    console.log(msg);
  });

  socket.emit(
    "inject-theme",
    JSON.stringify({
      usercss:
        "https://raw.githubusercontent.com/SpicetifyX/themes/refs/heads/main/SpicetifyX/user.css",
      schemes:
        "https://raw.githubusercontent.com/SpicetifyX/themes/refs/heads/main/SpicetifyX/color.ini",
      name: "SpicetifyX",
    }),
  );
});

httpServer.listen(3000, () => {
  console.log("Started socketio server");
});
