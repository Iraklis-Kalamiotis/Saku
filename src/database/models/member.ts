import mongoose from "mongoose";

const clanSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  rank: { type: String, default: "" },
}, { _id: false });

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, default: "" },
  discriminator: { type: String, default: "" },
  globalName: { type: String, default: null },
  avatar: { type: String, default: null },
  avatarDecorationData: { type: mongoose.Schema.Types.Mixed, default: null },
  bot: { type: Boolean, default: false },
  system: { type: Boolean, default: false },
  publicFlags: { type: Number, default: 0 },
  clan: { type: clanSchema, default: null }
}, { _id: false });

const coinTokenBoostSchema = new mongoose.Schema({
  amount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: () => new Date() },
}, { _id: false });

const modlogEntrySchema = new mongoose.Schema({
  action: { type: String, default: "" },
  reason: { type: String, default: "" },
  moderatorId: { type: String, default: "" },
  date: { type: Date, default: () => new Date() },
}, { _id: false });

const memberSchema = new mongoose.Schema({
_id: { type: String, required: true },  // Use user's id as _id (string)
  user: { type: userSchema, required: true },
  member: {
    economy: {
      coins: { type: coinTokenBoostSchema, default: () => ({}) },
      tokens: { type: coinTokenBoostSchema, default: () => ({}) },
      boost: { type: coinTokenBoostSchema, default: () => ({}) }
    },
    leveling: {
      level: { type: Number, default: 0 },
      xp: { type: Number, default: 0 },
      lastXpGain: { type: Date, default: () => new Date() }
    },
    modlogs: { type: [modlogEntrySchema], default: [] }
  },
  updatedAt: { type: Date, default: () => new Date() },
});

export default mongoose.model("Member", memberSchema);
