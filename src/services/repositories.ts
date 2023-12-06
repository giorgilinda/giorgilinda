export type RepositoryDataType = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};

export const fetchRepositories = async (
  username: string
): Promise<Array<RepositoryDataType> | undefined> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (response.ok) {
      const items: Array<RepositoryDataType> = await response.json();
      return items;
    } else {
      throw new Error("Sorry. Something went wrong...");
    }
  } catch (error) {
    console.log({ error });
  }
};
