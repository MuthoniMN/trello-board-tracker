import getBoards from "../utils/getBoards";
import { TBoard } from "../types";

// Mock fetch globally
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

describe("getBoards", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return only the tracked boards", async () => {
    const token = "test-token";
    const trackedBoardNames = ["Board A", "Board C"];
    
    const mockBoards: TBoard[] = [
      { id: "1", name: "Board A", desc: "Description A" },
      { id: "2", name: "Board B", desc: "Description B" },
      { id: "3", name: "Board C", desc: "Description C" }
    ];
    
    fetchMock.mockResponseOnce(JSON.stringify(mockBoards));
    
    const result = await getBoards(trackedBoardNames, token);
    
    expect(result).toEqual([
      { id: "1", name: "Board A", desc: "Description A" },
      { id: "3", name: "Board C", desc: "Description C" }
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`https://api.trello.com/1/members/me/boards?organization=false&fields=id,name,desc&key=${process.env.TRELLO_API_KEY}&token=${token}`),
    );
  });

  it("should return an empty array if no boards match", async () => {
    const token = "test-token";
    const trackedBoardNames = ["Nonexistent Board"];
    
    const mockBoards: TBoard[] = [
      { id: "1", name: "Board A", desc: "Description A" },
      { id: "2", name: "Board B", desc: "Description B" }
    ];
    
    fetchMock.mockResponseOnce(JSON.stringify(mockBoards));
    
    const result = await getBoards(trackedBoardNames, token);
    
    expect(result).toEqual([]);
  });

  it("should throw an error if the fetch request fails", async () => {
    const token = "test-token";
    fetchMock.mockReject(new Error("Failed to fetch"));

    await expect(getBoards(["Board A"], token)).rejects.toThrow("Failed to fetch");
  });
});

