// types/MemberTypes.ts

export interface IClan {
    name: string;
    rank: string;
  }
  
  export interface IUser {
    id: string;
    username: string;
    discriminator: string;
    globalName?: string | null;
    avatar?: string | null;
    avatarDecorationData?: any | null;
    bot: boolean;
    system: boolean;
    publicFlags: number;
    clan?: IClan | null;
  }
  
  export interface ICurrency {
    amount: number;
    lastUpdated: Date;
  }
  
  export interface IEconomy {
    coins: ICurrency;
    tokens: ICurrency;
    boost: ICurrency;
  }
  
  export interface ILeveling {
    level: number;
    xp: number;
    lastXpGain: Date;
  }
  
  export interface IModlogEntry {
    action: string;
    reason: string;
    moderatorId: string;
    date: Date;
  }
  
  export interface IMemberData {
    user: IUser;
    member: {
      economy: IEconomy;
      leveling: ILeveling;
      modlogs: IModlogEntry[];
    };
    updatedAt: Date;
  }
  