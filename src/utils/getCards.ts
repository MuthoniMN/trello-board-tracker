import { TBoard, TCard } from "../types/";

export default async function getCards(boards: TBoard[], token: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time for comparisons

  try {
    // Fetch cards for all boards in parallel
    const boardCardsArray = await Promise.all(
      boards.map(async (board: TBoard) => {
        const response = await fetch(
          `https://api.trello.com/1/boards/${board.id}/cards?fields=id,name,due,dateLastActivity&key=${process.env.TRELLO_API_KEY}&token=${token}`
        );
        if (!response.ok) throw new Error(`Failed to fetch cards for board: ${board.id}`);
        return response.json() as Promise<TCard[]>;
      })
    );

    const allCards = boardCardsArray.flat(); // Flatten array of arrays

    let dueCards: TCard[] = [];
    let changedCards: TCard[] = [];

    allCards.forEach((card: TCard) => {
      const lastActivity = new Date(card.dateLastActivity);
      const dueDate = card.due ? new Date(card.due) : null;

      if (lastActivity >= new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)) {
        if( changedCards.filter(c => c.id == card.id ).length <= 0 ) changedCards.push(card);
      }

      if (dueDate && dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)) {
        if( dueCards.filter(c => c.id == card.id ).length <= 0 ) dueCards.push(card);
      }
    });

    return { dueCards, changedCards };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
