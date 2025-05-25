import type { AvatarDecorationData } from "oceanic.js";


export interface Clan {
    badge: string;
    identityEnabled: boolean;
    identityGuildID: string;
    tag: string;
  };

  export interface UserPresence {
    status: "online" | "idle" | "dnd" | "offline";
    activities?: UserActivity[];
  }
  
  export interface UserActivity {
    name: string;
    type: number; 
    details?: string;
    state?: string;
  };

  export interface CachedUserData {
    id: string;
    username: string;
    discriminator?: string;
    globalName?: string | null;
    avatar?: string | null;
    avatarDecorationData?: AvatarDecorationData | null;
    bot: boolean;
    system: boolean;
    publicFlags: number;
    clan?: Clan | null;
  };