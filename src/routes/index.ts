import { Router } from "express";
import { config  } from "../integration";
import { TSetting, TBoard, TCard } from "../types/";
import getBoards from "../utils/getBoards";
import getCards from "../utils/getCards";
import createMessage from "../utils/createMessage";

const router = Router();

router.get('/integration.json', (req: any,res: any) => {
  return res.json(config);
});

router.get('/trello/authorize', (req: any, res: any) => {
  const { apiKey } = req.query;
  const key = process.env.TRELLO_API_KEY;

  res.redirect(`https://trello.com/1/authorize?key=${key}&scope=read&expiration=never&response_type=token`);
});

router.post('/target', async(
  req: any,
  res: any
) => {
  const { settings } = req.body;
  const token = settings.find((setting: TSetting) => setting.label == "Trello API Token").default;
  const boards = settings.find((setting: TSetting) => setting.label == "Which Trello board would you like to track?").default.split(',');
  const today = new Date();

  try {
    // retrieve all the user's boards
    const trackedBoards = await getBoards(boards, token);

    // get cards for all the boards
    const { dueCards, changedCards } = await getCards(trackedBoards, token);

      // send response back to telex channel
    const hour = today.getHours();
    const message = createMessage(hour, dueCards, changedCards);

    const data = {
      message,
      username: "Trello Board Tracker",
      event_name: "Trello Board Tracking",
      status: "success"
    }

    fetch(`${process.env.TELEX_WEBHOOK}`, { method: 'POST', body: JSON.stringify(data) }).then(response => {
      if(!response.ok) return res.json({ status: 500, description: "Failed to send notification" });

      return res.json({ status: 202, description: "Data received successfully!" });
    });

  } catch (error) {
    console.error(error);

    const data = {
      message: "Failed to generate Trello Board progress report",
      username: "Trello Board Tracker",
      event_name: "Trello Board Tracking",
      status: "error"
    }

    const res2 = await fetch(`${process.env.TELEX_WEBHOOK}`, { method: 'POST', body: JSON.stringify(data) });

    return res.json({ status: 500, description: "Failed to run service!" });

  }
});

export default router;
