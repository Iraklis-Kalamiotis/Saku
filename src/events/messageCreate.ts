import { SakuClient } from "../SakuClient";
import { ClientEvent } from "./ClientEvent";
import type { Message } from "oceanic.js";

export class MessageCreate extends ClientEvent<[Message]> {
  public name = "messageCreate";

  constructor(client: SakuClient) {
    super(client);
  }

  async run(message: Message): Promise<void> {
    // if (message.author.id === "379267610564362243") {
    //   await this.client.getUser(message.author.id);
    // }
  }
}