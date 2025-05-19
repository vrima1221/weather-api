import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./User.js";

const Subscription = sequelize.define("Subscription", {
  city: { type: DataTypes.STRING, allowNull: false },
  frequency: { type: DataTypes.ENUM("daily", "hourly"), allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
});

User.hasMany(Subscription);
Subscription.belongsTo(User);

export default Subscription;
