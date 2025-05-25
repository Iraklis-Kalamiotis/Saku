import { Client, ClientOptions, User } from "oceanic.js";
import Redis from "ioredis";
import type { CachedUserData, Clan } from "./types/user";
import path from "path";
import fs from 'fs';

export class SakuClient extends Client {
  public redis: Redis;
  public ws: any; 

  constructor(options: ClientOptions) {
    super(options);
    this.redis = new Redis();
    

    // this.on("packet", (msg) => {
    //   if (msg.author.id === "379267610564362243") {
    //     this.getUser(msg.author.id);
    //   }
    // });
  };

  static getClientOptions(): ClientOptions {
    return {
      auth: `Bot ${process.env.BOT_TOKEN}`,
      gateway: { intents: ["ALL"] },
    };
  }

  private buildClanData(clan?: User["clan"]): Clan | null {
    if (!clan) return null;
    return {
      badge: clan.badge,
      identityEnabled: clan.identityEnabled,
      identityGuildID: clan.identityGuildID,
      tag: clan.tag,
    };
  };

  async getUser(userID: string): Promise<User> {
    const cacheKey = `user:${userID}`;
    let cached: CachedUserData | null = null;

    const cachedRaw = await this.redis.get(cacheKey);
    if (cachedRaw) {
      try {
        cached = JSON.parse(cachedRaw);
      } catch {}
    };

    const user: User = this.users.get(userID) || (await this.rest.users.get(userID));

    const freshData: CachedUserData = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      globalName: user.globalName ?? null,
      avatar: user.avatar ?? null,
      avatarDecorationData: user.avatarDecorationData ?? null,
      bot: user.bot ?? false,
      system: user.system ?? false,
      publicFlags: user.publicFlags ?? 0,
      clan: this.buildClanData(user.clan),
    };

    if (!cached || JSON.stringify(cached) !== JSON.stringify(freshData)) {
      await this.redis.set(cacheKey, JSON.stringify(freshData), "EX", 3600);
    }
    console.log(freshData)
    return user;
  };

  async removeUserFromCache(userID: string): Promise<void> {
    await this.redis.del(`user:${userID}`);
  };

  async loadEvents() {
    const eventsPath = path.join(__dirname, "events");
    const files = fs.readdirSync(eventsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));
    
    for (const file of files) {
      const { [Object.keys(await import(path.join(eventsPath, file)))[0]]: EventClass } = await import(path.join(eventsPath, file));
      const eventInstance = new EventClass(this);

      if (eventInstance.once) {
        this.once(eventInstance.name, (...args) => eventInstance.run(...args));
      } else {
        this.on(eventInstance.name, (...args) => eventInstance.run(...args));
      }
    }
  };
}
