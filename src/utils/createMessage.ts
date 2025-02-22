import { TCard } from "../types/";

export default function createMessage(hour: number, dueCards: TCard[], changedCards: TCard[]): string {
    const greeting = (hour >= 7 && hour < 12) ? "🌅 Good morning, team 🌞" 
                  : (hour >= 12 && hour < 17) ? "🌻 Good afternoon, team ☀️" 
                  : "🌘 Good evening, team 🌒";

    let message = "";

    if (dueCards.length > 0 && changedCards.length > 0) {
        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰ Due Tasks (within 3 days):\n${dueCards.map((card, index) => `${index + 1}. ${card.name}`).join("\n")}\n\n📝 Updated Cards: 💡\n${changedCards.map((card, index) => `${index + 1}. ${card.name}`).join("\n")}\n\nHave a great rest of your day!`;
    } else if (dueCards.length > 0) {
        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n⏰ Due Tasks (within 3 days): ⏳\n${dueCards.map((card, index) => `${index + 1}. ${card.name}`).join("\n")}\n\n📝 Updated Cards: 💡\n${changedCards.map((card, index) => `${index + 1}. ${card.name}`).join("\n")}\n\nHave a great rest of your day!`;
    } else if (changedCards.length > 0) {
        message = `${greeting}\n\nHere's your Trello Board progress for the day:\n\n📝 Updated Cards: 💡\n${changedCards.map((card, index) => `${index + 1}. ${card.name}`).join("\n")}\n\nHave a great rest of your day!`;
    } else {
        message = `${greeting}\n\nThere are no new updates on the Trello Board\n\nHave a great rest of your day!`;
    }

    return message;
}

