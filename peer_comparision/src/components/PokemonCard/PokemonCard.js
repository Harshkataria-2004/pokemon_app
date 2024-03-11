import React, { useEffect, useState } from "react";
import "./PokemonCard.css";

const PokemonCard = (props) => {
  const [pokemon, setPokemon] = useState(null);

  const fetchData = async () => {
    try {
      let response = await fetch(props.pok.url);
      let data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();

      // Note: Make sure to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (!pokemon || !pokemon.sprites) {
    // If pokemon or its sprites are null, return a loading state or an error message
    return <div>Loading...</div>;
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "normal":
        return "#A8A77A";
      case "fire":
        return "#EE8130";
      case "water":
        return "#6390F0";
      case "electric":
        return "#F7D02C";
      case "grass":
        return "#7AC74C";
      case "ice":
        return "#96D9D6";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#A33EA1";
      case "ground":
        return "#E2BF65";
      case "flying":
        return "#A98FF3";
      case "psychic":
        return "#F95587";
      case "bug":
        return "#A6B91A";
      case "rock":
        return "#B6A136";
      case "ghost":
        return "#735797";
      case "dark":
        return "#705746";
      case "dragon":
        return "#6F35FC";
      case "steel":
        return "#B7B7CE";
      case "fairy":
        return "#D685AD";
      default:
        return "#A8A77A"; // Default color for unknown types
    }
  };

  const backgroundColor = getTypeColor(pokemon.types[0].type.name); // Assuming the first type is used for background color

  return (
    <div
      className="row"
      style={{
        height: "11rem",
        backgroundColor,
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "0.5rem",
        margin: "0.5rem 0",
        padding: "1rem",
      }}
    >
      <div className="col-6">
        <div className="row" style={{ position: "relative", height: "100%" }}>
          <div
            className="col-12"
            style={{
              textTransform: "capitalize",
              color: "white",
              fontWeight: "bolder",
              fontSize: "1.5rem",
              position: "relative",
              top: "0",
            }}
          >
            {pokemon.name}
          </div>
          <div
            className="col-12"
            style={{
              position: "relative",
              top: "1%",
            }}
          >
            <div className="row">
              <div
                className="col-12"
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                Type:
              </div>
              <div className="col-12">
                {pokemon.types.map((p, index) => (
                  <React.Fragment key={index}>
                    <span>
                      <span
                        style={{
                          color: "white",
                          fontSize: "0.8rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {p.type.name}
                        {index < pokemon.types.length - 1 && <span>, </span>}
                      </span>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div
            className="col-12"
            style={{
              position: "relative",
              bottom: "0",
            }}
          >
            <span
              style={{
                color: "black",
                backgroundColor: "hsla(0, 0%, 100%, .6)",
                padding: "0.25rem 1rem",
                fontSize: "1rem",
                borderRadius: "1rem",
              }}
            >
              {pokemon.id < 10
                ? `00${pokemon.id}`
                : pokemon.id < 100
                ? `0${pokemon.id}`
                : `${pokemon.id}`}
              {}
            </span>
          </div>
        </div>
      </div>
      <div
        className="col-6"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="card-img-top rounded-top"
          src={pokemon.sprites.other[`official-artwork`].front_default}
          alt={`Shiny Image of ${props.pok.name}`}
          style={{ width: "8rem", height: "8rem",transition: "transform 0.3s ease-in-out", }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
    </div>
  );
};

export default PokemonCard;
