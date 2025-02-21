import { Router, Request, Response } from "express";

const router = Router();

router.get('/integration.json', (req: any,res: any) => {
  return res.json({
    name: "Modify"
  });
});

router.post('/trello/authorize', (req: any, res: any) => {

});

router.post('/target', (
  req: any,
  res: any
) => {
  return res.json({ status: 202, description: "Data received successfully!" })
});

router.post('/tick', (req: any, res: any) => {

});

export default router;
