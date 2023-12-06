import { fetchUsers } from "./users";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("users service", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  test("fetch a list of users from the GitHub api", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ items: [{ login: "aaa" }, { login: "aaaddress1" }] })
    );

    const users = await fetchUsers("aaa");
    expect(users).toEqual([{ login: "aaa" }, { login: "aaaddress1" }]);
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
