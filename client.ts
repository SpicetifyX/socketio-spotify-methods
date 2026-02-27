import type { Socket } from "socket.io";

export default class RemoteClient {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  on(eventName: string, callback: (data: string) => void) {
    this.socket.on(eventName, (data) => {
      callback(data);
    });
  }

  async getConfig() {
    this.socket.emit("get-config");

    return new Promise((resolve) => {
      this.socket.on("get-config", (msg) => {
        resolve(msg);
      });
    });
  }

  removeThemes() {
    this.socket.emit("remove-themes");
  }

  injectTheme(
    userCSSURL: string,
    schemesURL: string,
    name: string,
    activeScheme: string,
  ) {
    this.socket.emit(
      "inject-theme",
      JSON.stringify({
        usercss: userCSSURL,
        schemes: schemesURL,
        name: name,
        activeScheme: activeScheme,
      }),
    );
  }
}
