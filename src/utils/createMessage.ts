import { TCard } from "../types/";

export default function createMessage(hour: number, dueCards: TCard[], changedCards: TCard[]): string {
    const greeting = (hour >= 7 && hour < 12) ? "🌅 Good morning, team 🌞" 
                  : (hour >= 12 && hour < 17) ? "🌻 Good afternoon, team ☀️" 
                  : "🌘 Good evening, team 🌒";

    let message = "";

    let dueString = dueCards.reduce((str, card, index) => str + `${index + 1}. ${card.name}\n\tStatus: ${card.closed ? '⛔ Closed': '✅ Open'}\n\t📅Due Date: ${card.due ? (new Date(card.due as string)).toString() : "Not Set"} \n\n`, '');
    let changeString = changedCards.reduce((str, card, index) => str + `${index + 1}. ${card.name}\nStatus: ${card.closed ? '⛔ Closed': '✅ Open'}\n\t📅Due Date: ${card.due ? (new Date(card.due as string)).toString() : "Not Set"}\n`, '')

    if (dueCards.length > 0 && changedCards.length > 0) {

        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰ Due Tasks (within 3 days):\n${dueString}\n\n📝 Updated Cards: 💡\n--------------------------------\n${changeString}\n\nHave a great rest of your day!`;

    } else if (dueCards.length > 0) {

        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰ Due Tasks (within 3 days): ⏳\n${dueString}\n\nHave a great rest of your day!`;

    } else if (changedCards.length > 0) {

        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n📝 Updated Cards: 💡\n${changeString}\n\nHave a great rest of your day!`;

    } else {
        message = `${greeting}\n\nThere are no new updates on the Trello Board\n\nHave a great rest of your day!`;
    }

    return message;
}

