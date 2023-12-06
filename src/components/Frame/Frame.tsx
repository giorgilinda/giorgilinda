import { FormEvent, useState } from "react";
import "./Frame.css";
import { UserDataType, fetchUsers } from "../../services/users";
import { DropdownButton } from "../DropdownButton/DropdownButton";

export type FrameProps = {
  title: string;
};

export const Frame: React.FC<FrameProps> = ({ title }) => {
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserDataType[]>([]);

  const getUsers = async (name: string) => {
    setUsername(name);
    const result = await fetchUsers(name);
    if (result) {
      setUsers(result);
    } else {
      setUsers([]);
    }
    setLoaded(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loaded) {
      const input = event.currentTarget.elements[1] as HTMLInputElement;
      const username = input.value;
      getUsers(username);
    }
  };

  return (
    <div className="frame">
      <h3 className="title">{title}</h3>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <input
            id="username"
            className="usernameInput"
            type="text"
            alt="Enter username"
            placeholder="Enter username"
            onChange={() => setLoaded(false)}
          />
          <button className="searchButton" type="submit">
            Search
          </button>

          {users && users.length > 0 && (
            <>
              <span className="resultText">Showing users for "{username}"</span>
              {users.map((user, index) => (
                <DropdownButton key={index} username={user.login} />
              ))}
            </>
          )}
        </fieldset>
      </form>
    </div>
  );
};
