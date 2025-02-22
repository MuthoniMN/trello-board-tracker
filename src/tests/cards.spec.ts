import getCards from "../utils/getCards";
import { TBoard, TCard } from "../types";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("getCards", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return categorized cards (dueCards and changedCards)", async () => {
    const token = "test-token";
    const today = new Date();
    
    const mockBoards: TBoard[] = [
      { id: "board-1", name: "Board A", desc: "Description A" },
      { id: "board-2", name: "Board B", desc: "Description B" }
    ];

    const mockCards: TCard[] = [
      { id: "1", name: "Urgent Task", due: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), dateLastActivity: today.toISOString() },
      { id: "2", name: "Old Task", due: null, dateLastActivity: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: "3", name: "Recent Update", due: null, dateLastActivity: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() }
    ];
    
    fetchMock.mockResponse(JSON.stringify(mockCards));
    
    const result = await getCards(mockBoards, token);

    expect(result.dueCards).toHaveLength(1);
    expect(result.changedCards).toHaveLength(2);
  });

  it("should return empty arrays if no cards match criteria", async () => {
    const token = "test-token";
    const mockBoards: TBoard[] = [{ id: "board-1", name: "Board A", desc: "Description A" }];

    const mockCards: TCard[] = [
      { id: "1", name: "Old Task", due: null, dateLastActivity: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() }
    ];

    fetchMock.mockResponse(JSON.stringify(mockCards));

    const result = await getCards(mockBoards, token);
    
    expect(result.dueCards).toEqual([]);
    expect(result.changedCards).toEqual([]);
  });

  it("should throw an error if the fetch request fails", async () => {
    const token = "test-token";
    const mockBoards: TBoard[] = [{ id: "board-1", name: "Board A", desc: "Description A" }];
    fetchMock.mockReject(new Error("Fetch failed"));
    
    await expect(getCards(mockBoards, token)).rejects.toThrow("Fetch failed");
  });
});

