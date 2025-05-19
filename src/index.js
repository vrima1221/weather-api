import express from "express";
import "dotenv/config";
import cors from "cors";
import cron from "node-cron";
import weatherRoutes from "./routes/weather.js";
import subscribeRoutes from "./routes/subscribe.js";
import confirmRoutes from "./routes/confirm.js";
import unsubscribeRoutes from "./routes/unsubscribe.js";
import { deliverWeatherEmails } from "./services/email.js";
import { runMigrations } from "./migrate.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/weather", weatherRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/confirm", confirmRoutes);
app.use("/api/unsubscribe", unsubscribeRoutes);

runMigrations().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  cron.schedule("* * * * *", async () => {
    console.log("Running hourly weather email job");
    await deliverWeatherEmails("hourly");
  });

  cron.schedule("0 8 * * *", async () => {
    console.log("Running daily weather email job");
    await deliverWeatherEmails("daily");
  });
});
