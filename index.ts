import { BotClient } from "./SakuClient";

const client = new BotClient();
client.start().catch(console.error);