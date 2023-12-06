import { fetchRepositories } from "./repositories";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("repositories service", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  test("fetch a list of repositories of a user from the GitHub api", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { name: "repo1", description: "description1", stargazers_count: 0 },
      ])
    );

    const users = await fetchRepositories("aaa");
    expect(users).toEqual([
      { name: "repo1", description: "description1", stargazers_count: 0 },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/aaa/repos`
    );
  });

  test("return an error from the GitHub api", async () => {
    fetchMock.mockReject(new Error("API failure"));

    const users = await fetchRepositories("aaa");
    expect(users).toEqual(undefined);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/aaa/repos`
    );
  });
});
