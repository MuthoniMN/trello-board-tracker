import { Router, Request, Response } from "express";
import { config  } from "../integration";

const router = Router();

router.get('/integration.json', (req: any,res: any) => {
  return res.json(config);
});

router.get('/trello/authorize', (req: any, res: any) => {
  const { apiKey } = req.query;
  const key = process.env.TRELLO_API_KEY;

  res.redirect(`https://trello.com/1/authorize?key=${key}&scope=read&expiration=never&response_type=token`);
});

router.post('/target', (
  req: any,
  res: any
) => {
  const { channelId, return_url , settings } = req.body;
  return res.json({ status: 202, description: "Data received successfully!" })
});

export default router;
