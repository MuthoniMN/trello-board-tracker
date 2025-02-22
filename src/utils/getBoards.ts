import { TBoard } from "../types/";

export default async function getBoards(boards: string[], token: string){
  // retrieve all the user's boards
  console.log(`https://api.trello.com/1/members/me/boards?organization=false&fields=id,name,desc&key=${process.env.TRELLO_API_KEY}&token=${token}`);
  const response = await fetch(`https://api.trello.com/1/members/me/boards?organization=false&fields=id,name,desc&key=${process.env.TRELLO_API_KEY}&token=${token}`);
  const allBoards = await response.json();

  // filter boards that are to be tracked
  const trackedBoards = allBoards.filter((board: TBoard) => boards.includes(board.name));

  return trackedBoards;
}
