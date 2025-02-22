import { Router } from "express";
import { config  } from "../integration";
import { TSetting, TBoard, TCard } from "../types/";

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
    const response = await fetch(`https://api.trello.com/1/members/me/boards?organization=false&fields=id,name,desc&key=${process.env.TRELLO_API_KEY}&token=${token}`);
    const allBoards = await response.json();

    // filter boards that are to be tracked
    const trackedBoards = allBoards.filter((board: TBoard) => boards.includes(board.name));

    // get cards for all the boards
    let cards: TCard[][] = [];
    Promise.all(trackedBoards.map(async (board: TBoard) => {
      const response = await fetch(`https://api.trello.com/1/boards/${board.id}/cards?fields=id,name,due,dateLastActivity&key=${process.env.TRELLO_API_KEY}&token=${token}`);
      const allBoardCards = await response.json();

      return allBoardCards as TCard[];
    })).then(resData => {
      console.log(resData);
      cards = [...resData];

      // categorize cards: due today, critical in-progess, unassigned
      let dueCards = [] as TCard[];
      let changedCards = [] as TCard[];
      cards?.map(c => c.map((card: TCard) => {
        console.log(card);
        (new Date(card.dateLastActivity).getDate() >= today.setDate(today.getDate() - 3))
          ? changedCards.push(card) 
          : new Date(card.due).getDate() <= today.setDate(today.getDate() + 3);
      }));


      // send response back to telex channel
      const hour = today.getHours();
      const greeting = (hour>= 7 && hour < 12) ? "🌅 Good morning, team 🌞" : (hour >= 12 && hour < 17 ) ? "🌻 Good afternoon, team ☀️" : "🌘 Good evening, team 🌒";

      let message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰Due Tasks(within 3 days): \n${dueCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nUpdated Cards: \n ${changedCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nHave a great rest of your day!`;

      if(dueCards.length > 0 && changedCards.length > 0){

        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰Due Tasks(within 3 days): \n${dueCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nUpdated Cards: \n ${changedCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nHave a great rest of your day!`;

      } else if(dueCards.length > 0) {

          message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰Due Tasks(within 3 days): \n${dueCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nHave a great rest of your day!`;

      } else if (changedCards.length > 0) {
        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\nUpdated Cards: \n ${changedCards.map((card, index) => `${index + 1}. ${card.name}\n`)}\n\nHave a great rest of your day!`;

      } else {
        message = `${greeting}\n\nThere are no new updates on the Trello BoardHave a great rest of your day!`;
      }

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
