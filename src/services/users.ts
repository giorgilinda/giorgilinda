export type UserDataType = {
  id: number;
  login: string;
};

export type UserDataResponseType = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<UserDataType>;
};

export const fetchUsers = async (
  username: string
): Promise<Array<UserDataType> | undefined> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    if (response.ok) {
      const { items }: UserDataResponseType = await response.json();
      return items;
    } else {
      throw new Error("Sorry. Something went wrong...");
    }
  } catch (e) {
    return undefined;
  }
};
