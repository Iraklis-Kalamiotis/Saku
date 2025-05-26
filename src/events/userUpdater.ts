import { ClientEvent } from "./ClientEvent";
import type { SakuClient } from "../SakuClient";
import type { RawPacket } from "oceanic.js/dist/lib/types/gateway-raw";

export class PackerEvent extends ClientEvent<[RawPacket]> {
  public name = "packet";

  constructor(client: SakuClient) {
    super(client);
  }

  async run(packet: RawPacket): Promise<void> {
    const { t, d } = packet;
    const data = d as Record<string, any>;
  
    const userID =
      data.author?.id ||
      data.member?.user?.id ||
      data.user?.id ||
      data.user_id
    if (!userID) return;
  
    switch (t) {
      case "MESSAGE_CREATE":
      case "MESSAGE_UPDATE":
      case "INTERACTION_CREATE":
      case "USER_UPDATE":
      case "GUILD_MEMBER_ADD":
      case "GUILD_MEMBER_UPDATE":
      case "VOICE_STATE_UPDATE":
      case "MESSAGE_REACTION_ADD":
      case "MESSAGE_REACTION_REMOVE":
         let user = await this.client.getUser(userID); //Cache User
            await this.client.db.syncUser(user.id, user)
        break;
    }
  }
}