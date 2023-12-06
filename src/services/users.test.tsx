import { fetchUsers } from "./users";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("users service", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  test("fetch a list of users (max 5) from the GitHub api", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [
          { login: "aaa" },
          { login: "aaaddress1" },
          { login: "awwright" },
          { login: "aaahmedms" },
          { login: "Aaaaaaaty" },
          { login: "Aaaaash" },
          { login: "Aaaaaaron" },
        ],
      })
    );

    const users = await fetchUsers("aaa");
    expect(users?.length).toBeLessThanOrEqual(5);
    expect(users).toEqual([
      { login: "aaa" },
      { login: "aaaddress1" },
      { login: "awwright" },
      { login: "aaahmedms" },
      { login: "Aaaaaaaty" },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=aaa`
    );
  });

  test("return an error from the GitHub api", async () => {
    fetchMock.mockReject(new Error("API failure"));

    const users = await fetchUsers("aaa");
    expect(users).toEqual(undefined);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=aaa`
    );
  });
});
