import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;
