import { Member } from 'oceanic.js';
import { SakuClient } from '../SakuClient';
import member from './models/member';
import mongoose from 'mongoose';
import { CachedUserData } from '../types/user';

class Database {
  private uri: string;
  private client: SakuClient; // store client reference

  constructor(uri: string, client: SakuClient) {
    this.uri = uri;
    this.client = client;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    }
  };

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('🔌 MongoDB disconnected');
    } catch (err) {
      console.error('❌ MongoDB disconnection error:', err);
    }
  };

  public async createOrUpdateUser(userId: string, data: CachedUserData): Promise<void> {
    try {
        await member.findOneAndUpdate({ "user.id": userId }, { $set: { user: userId, updatedAt: new Date() } }, { upsert: true, new: true });
      } catch (e) {
        console.error("DB error:", e);
      }
};

public async updateData(filter: Record<string, any>, update: Record<string, any>): Promise<void> {
    try {
      await member.findOneAndUpdate(filter, update, { upsert: true, new: true });
    } catch (e) {
      console.error("DB update error:", e);
    }
  }


  public async syncUser(userId:string,cachedUser:CachedUserData):Promise<void>{
    try{
      const dbUser= await member.findById(userId)
      if(!dbUser)return await this.updateData({"user.id":userId},{_id: userId, user:cachedUser,updatedAt:new Date()})
      if(JSON.stringify(dbUser)!==JSON.stringify(cachedUser))await this.updateData({"user.id":userId},{_ID: userId, user:cachedUser,updatedAt:new Date()})
    }catch(e){console.error("DB sync error:",e)}
  }
};

export default Database;
