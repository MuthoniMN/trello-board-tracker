import createMessage from "../utils/createMessage";
import { TCard } from "../types";

describe("createMessage", () => {
  it("should return a morning greeting when hour is in the morning", () => {
    const message = createMessage(9, [], []);
    expect(message).toContain("🌅 Good morning, team 🌞");
  });

  it("should return an afternoon greeting when hour is in the afternoon", () => {
    const message = createMessage(14, [], []);
    expect(message).toContain("🌻 Good afternoon, team ☀️");
  });

  it("should return an evening greeting when hour is in the evening", () => {
    const message = createMessage(19, [], []);
    expect(message).toContain("🌘 Good evening, team 🌒");
  });

  it("should return a message with due tasks when dueCards are provided", () => {
    const dueCards: TCard[] = [{ id: "1", name: "Urgent Task", due: "2025-02-25", dateLastActivity: "2025-02-20" }];
    const message = createMessage(10, dueCards, []);
    expect(message).toContain("⏰ Due Tasks (within 3 days):");
    expect(message).toContain("1. Urgent Task");
  });

  it("should return a message with updated cards when changedCards are provided", () => {
    const changedCards: TCard[] = [{ id: "2", name: "Updated Task", due: "", dateLastActivity: "2025-02-22" }];
    const message = createMessage(10, [], changedCards);
    expect(message).toContain("📝 Updated Cards: 💡");
    expect(message).toContain("1. Updated Task");
  });

  it("should return a message with both due and updated cards", () => {
    const dueCards: TCard[] = [{ id: "1", name: "Urgent Task", due: "2025-02-25", dateLastActivity: "2025-02-20" }];
    const changedCards: TCard[] = [{ id: "2", name: "Updated Task", due: "", dateLastActivity: "2025-02-22" }];
    const message = createMessage(10, dueCards, changedCards);
    expect(message).toContain("⏰ Due Tasks (within 3 days):");
    expect(message).toContain("1. Urgent Task");
    expect(message).toContain("📝 Updated Cards: 💡");
    expect(message).toContain("1. Updated Task");
  });

  it("should return a message stating no updates when both lists are empty", () => {
    const message = createMessage(10, [], []);
    expect(message).toContain("There are no new updates on the Trello Board");
  });
});

