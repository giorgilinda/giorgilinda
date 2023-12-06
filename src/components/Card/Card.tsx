import "./Card.css";

export type CardProps = {
  name: string;
  description: string;
  stars: number;
};

export const Card: React.FC<CardProps> = ({ name, description, stars }) => {
  return (
    <div className="container">
      <span className="cardName">{name}</span>
      <span className="cardStars">
        <span>{stars}</span>
        <span className="material-symbols-outlined">star</span>
      </span>
      <span className="cardDescription">{description}</span>
    </div>
  );
};
