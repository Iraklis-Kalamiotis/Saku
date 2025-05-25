import { Client, ClientOptions } from "oceanic.js";
import "dotenv/config";
export class BotClient {
  private client: Client;

  constructor() {
    this.client = new Client(BotClient.clientOptions);
  }

  public async start() {
    await this.client.connect();
  }

  static get clientOptions(): ClientOptions {
    return {
      auth: `Bot ${process.env.BOT_TOKEN}`,
      gateway: {
        intents: [
          "GUILDS",
          "GUILD_MESSAGES",
          "MESSAGE_CONTENT"
        ]
      }
    };
  }
};