import "dotenv/config";
import express from "express";
import { middleware, messagingApi, MiddlewareConfig } from "@line/bot-sdk";
import { handleEvent } from "./webhook/handler";
import { setupScheduler } from "./scheduler/cron";

const middlewareConfig: MiddlewareConfig = {
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
});

const app = express();

// LINE webhook
app.post("/webhook", middleware(middlewareConfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log(`Webhook received: ${events.length} events`, JSON.stringify(events));
    await Promise.allSettled(
      events.map((event: any) => handleEvent(client, event))
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

async function main() {
  setupScheduler(client);
  app.listen(PORT, () => {
    console.log(`Weather Gift Bot listening on port ${PORT}`);
  });
}

main().catch(console.error);
