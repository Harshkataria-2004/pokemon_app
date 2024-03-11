import React, { useState, useEffect } from "react";
import ScrollableTable from "../../components/ScrollableTable/ScrollableTable";
import "./Compare.css";
import { Link } from "react-router-dom";

const Compare = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemonData1, setPokemonData1] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);
  const [movesDetails1, setMovesDetails1] = useState(null);
  const [movesDetails2, setMovesDetails2] = useState(null);

  const fetchPokemonData = async (name, setPokemonData, setMovesDetails) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemonData(data);
      await fetchPokemonMoves(data, setMovesDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemonMoves = async (pokemon, setMovesDetails) => {
    try {
      const movesData = await Promise.all(
        pokemon.moves.map(async (move) => {
          const moveResponse = await fetch(move.move.url);
          return moveResponse.json();
        })
      );
      setMovesDetails(movesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e, setPokemon) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleAddClick = async (
    pokemonName,
    setPokemonData,
    setMovesDetails
  ) => {
    await fetchPokemonData(pokemonName, setPokemonData, setMovesDetails);
    await fetchPokemonMoves(pokemonName, setMovesDetails);
  };

  useEffect(() => {
    if (pokemonData1 && movesDetails1) {
      console.log("Pokemon 1 moves:", movesDetails1);
    }
  }, [pokemonData1, movesDetails1]);

  useEffect(() => {
    if (pokemonData2 && movesDetails2) {
      console.log("Pokemon 2 moves:", movesDetails2);
    }
  }, [pokemonData2, movesDetails2]);

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

  console.log("Pokemon 1 data:", movesDetails1);

  console.log("Pokemon 2 data:", movesDetails1);

  return (
    <div
      className="container compare-container"
      style={{ color: "white", padding: "2rem 0" }}
    >
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        Compare Pokémons
      </p>
      <table
        className="table-bordered compare-scrollable-table"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Enter Pokemon Name or Id"
                  style={{
                    width: "80%",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.5rem",
                  }}
                  value={pokemon1}
                  onChange={(e) => handleInputChange(e, setPokemon1)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddClick(pokemon1, setPokemonData1, setMovesDetails1);
                  }}
                >
                  Add
                </button>
              </div>
            </th>
            <th>
              <input
                type="text"
                placeholder="Enter Pokemon Name or Id"
                style={{
                  width: "80%",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.5rem",
                }}
                value={pokemon2}
                onChange={(e) => handleInputChange(e, setPokemon2)}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleAddClick(pokemon2, setPokemonData2, setMovesDetails2);
                }}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    backgroundColor: getTypeColor(
                      pokemonData1.types[0].type.name
                    ),
                    margin: "1rem",
                    borderRadius: "1rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        textTransform: "capitalize",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        borderBottom: "1px solid white",
                      }}
                    >
                      {pokemonData1.name}
                    </p>
                  </div>
                  <div>
                    <img
                      src={
                        pokemonData1.sprites.other[`official-artwork`]
                          .front_default
                      }
                      alt=""
                      style={{ width: "15rem", height: "15rem" }}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: getTypeColor(
                      pokemonData2.types[0].type.name
                    ),
                    margin: "1rem",
                    borderRadius: "1rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        textTransform: "capitalize",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        borderBottom: "1px solid white",
                      }}
                    >
                      {pokemonData2.name}
                    </p>
                  </div>
                  <div>
                    <img
                      src={
                        pokemonData2.sprites.other[`official-artwork`]
                          .front_default
                      }
                      alt=""
                      style={{ width: "15rem", height: "15rem" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          )}

          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "1.5rem" }}>
                      {pokemonData1.height}m
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                      Height
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem" }}>
                      {pokemonData1.weight}Kg
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                      Weight
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "1.5rem" }}>
                      {pokemonData2.height}m
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                      Height
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem" }}>
                      {pokemonData2.weight}Kg
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                      Weight
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}

          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {pokemonData1.types.map((pok, index) => {
                      return (
                        <span
                          key={index}
                          style={{
                            color: "white",
                            backgroundColor: getTypeColor(pok.type.name),
                            padding: "0.25rem 1rem",
                            borderRadius: "1rem",
                            display: "inline-block",
                            marginRight:
                              pokemonData1.types.length > 1 ? "1rem" : "", // Adjust the margin as needed
                          }}
                        >
                          {pok.type.name}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                    Type
                  </div>
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {pokemonData2.types.map((pok, index) => {
                      return (
                        <span
                          key={index}
                          style={{
                            color: "white",
                            backgroundColor: getTypeColor(pok.type.name),
                            padding: "0.25rem 1rem",
                            borderRadius: "1rem",
                            display: "inline-block",
                            marginRight:
                              pokemonData2.types.length > 1 ? "1rem" : "", // Adjust the margin as needed
                          }}
                        >
                          {pok.type.name}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#A7B9C2" }}>
                    Type
                  </div>
                </div>
              </td>
            </tr>
          )}

          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Base Stats
                  </p>
                  {pokemonData1.stats.map((stat, index) => {
                    return (
                      <div
                        key={index}
                        style={{ padding: "0.5rem 1rem", textAlign: "start" }}
                      >
                        <strong style={{ color: "white" }}>
                          {stat.stat.name}
                        </strong>
                        <div className="progress mt-1">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                              backgroundColor: getTypeColor(
                                pokemonData1.types[0].type.name
                              ),
                            }}
                            aria-valuenow={stat.base_stat}
                            aria-valuemin="0"
                            aria-valuemax="255"
                          >
                            {stat.base_stat}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Base Stats
                  </p>
                  {pokemonData2.stats.map((stat, index) => {
                    return (
                      <div
                        key={index}
                        style={{ padding: "0.5rem 1rem", textAlign: "start" }}
                      >
                        <strong style={{ color: "white" }}>
                          {stat.stat.name}
                        </strong>
                        <div className="progress mt-1">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                              backgroundColor: getTypeColor(
                                pokemonData2.types[0].type.name
                              ),
                            }}
                            aria-valuenow={stat.base_stat}
                            aria-valuemin="0"
                            aria-valuemax="255"
                          >
                            {stat.base_stat}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          )}

          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <ScrollableTable moves={movesDetails1} />
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <ScrollableTable moves={movesDetails2} />
                </div>
              </td>
            </tr>
          )}
          {pokemonData1 && pokemonData2 && (
            <tr>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/pokemon/${pokemon1}`}
                  >
                    Details
                  </Link>{" "}
                </div>
              </td>
              <td>
                <div
                  style={{
                    backgroundColor: "#293444",
                    margin: "1rem",
                    padding: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/pokemon/${pokemon2}`}
                  >
                    Details
                  </Link>{" "}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Compare;
