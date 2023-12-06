import { useState } from "react";
import {
  RepositoryDataType,
  fetchRepositories,
} from "../../services/repositories";
import "./DropdownButton.css";
import { Card } from "../Card/Card";

export type DropdownButtonProps = {
  username: string;
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [repositories, setRepositories] = useState<RepositoryDataType[]>([]);

  const getRepositories = async () => {
    const repos = await fetchRepositories(username);

    if (repos) {
      setRepositories(repos);
    } else {
      setRepositories([]);
    }
  };

  const handleClick = () => {
    console.log({ loaded });
    if (!loaded) {
      getRepositories().then(() => {
        setLoaded(true);
      });
    }
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className="button" onClick={handleClick}>
        <span className="username">{username}</span>
        {!open && (
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        )}
        {open && (
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
        )}
      </button>
      {repositories &&
        repositories.length > 0 &&
        open &&
        repositories.map((repo, index) => (
          <Card
            key={index}
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count}
          />
        ))}
      {repositories && repositories.length === 0 && open && loaded && (
        <p>No repositories found.</p>
      )}
    </>
  );
};
