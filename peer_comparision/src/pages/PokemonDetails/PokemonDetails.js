import React, { useEffect, useState } from "react";
import "./PokemonDetails.css";
import ScrollableTable from "../../components/ScrollableTable/ScrollableTable";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const PokemonDetails = () => {
  const { name } = useParams();
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [moveDetails, setMoveDetails] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [collectedEvolutions, setCollectedEvolutions] = useState([]);
  // const [habitat, setHabitat] = useState(null);
  // const [abilities, setAbilities] = useState([]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`${apiUrl}/${name}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [name]);

  useEffect(() => {
    const fetchPokemonMoves = async () => {
      try {
        const movesData = await Promise.all(
          pokemonDetails.moves.map(async (move) => {
            const moveResponse = await fetch(move.move.url);
            return moveResponse.json();
          })
        );
        setMoveDetails(movesData);
      } catch (error) {
        console.log(error);
      }
    };

    if (pokemonDetails && pokemonDetails.moves) {
      fetchPokemonMoves();
    }
  }, [pokemonDetails]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        );
        const data = await response.json();
        setPokemonDescription(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemonDetails();
  }, [pokemonDetails]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        );
        let data = await response.json();
        let evolutionChainResponse = await fetch(data.evolution_chain.url);
        let evolutionChainData = await evolutionChainResponse.json();
        setEvolutionChain(evolutionChainData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionChain();
  }, [name]);

  useEffect(() => {
    const fetchEvolutionDetails = async () => {
      try {
        const evolutionStages = [];
        let currentStage = evolutionChain.chain;

        do {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${currentStage.species.name}`
          );
          const data = await response.json();
          evolutionStages.push(data);

          currentStage = currentStage.evolves_to && currentStage.evolves_to[0];
        } while (currentStage);

        setCollectedEvolutions(evolutionStages);
      } catch (error) {
        console.log(error);
      }
    };

    if (evolutionChain) {
      fetchEvolutionDetails();
    }
  }, [evolutionChain]);

  if (!pokemonDetails) {
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

  console.log("pokemon", pokemonDetails);
  // console.log("moves",moveDetails);
  // console.log("details", pokemonDescription);
  console.log("evolution", collectedEvolutions);

  const backgroundColor = getTypeColor(pokemonDetails.types[0].type.name); // Assuming the first type is used for background color

  return (
    <div className="container">
      <div className="row" style={{ margin: "1rem 0" }}>
        <div
          className="col-xl-4 col-lg-4 col-md-12 col-sm-12"
          style={{ margin: "1rem 0 0 0" }}
        >
          <div
            style={{
              backgroundColor,
              borderRadius: "1rem",
            }}
            className="row"
          >
            <div className="col-12">
              <div className="row">
                <div className="col-2" style={{ position: "relative" }}>
                  <div
                    style={{
                      color: "white",
                      position: "absolute",
                      fontSize: "5rem",
                      fontWeight: "900",
                      transform: "rotate(-90deg)", // Adjusted to -90deg for correct rotation
                      transformOrigin: "60% 120%", // Adjusted to 0 100% for proper positioning
                      // top: "45%", // Center vertically
                      // right: "0%", // Align to the left
                      opacity: "0.5",
                      whiteSpace: "nowrap", // Prevent line breaks
                    }}
                  >
                    #
                    {pokemonDetails.id < 10
                      ? `00${pokemonDetails.id}`
                      : pokemonDetails.id < 100
                      ? `0${pokemonDetails.id}`
                      : `${pokemonDetails.id}`}
                    {}
                  </div>
                </div>
                <div className="col-10">
                  <img
                    className="card-img-top rounded-top"
                    src={
                      pokemonDetails.sprites.other[`official-artwork`]
                        .front_default
                    }
                    alt={`Shiny Image of ${pokemonDetails.name}`}
                    style={{ width: "20rem", height: "20rem" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12" style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "3rem",
                  textTransform: "capitalize",
                }}
              >
                {name}
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-xl-8 col-lg-8 col-md-12 col-sm-12"
          style={{ margin: "1rem 0 0 0" }}
        >
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                  style={{ marginBottom: "1rem" }}
                >
                  <div
                    style={{
                      backgroundColor: "#293444",
                      height: "100%",
                      borderRadius: "1rem",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div className="">
                        <div style={{ color: "white", fontWeight: "bold" }}>
                          Height
                        </div>
                        <div style={{ color: "white", fontSize: "2rem" }}>
                          {pokemonDetails.height}m
                        </div>
                      </div>
                      <div className="">
                        <div style={{ color: "white", fontWeight: "bold" }}>
                          Weight
                        </div>
                        <div style={{ color: "white", fontSize: "2rem" }}>
                          {pokemonDetails.weight}Kg
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                  style={{ marginBottom: "1rem" }}
                >
                  <div
                    style={{
                      backgroundColor: "#293444",
                      height: "100%",
                      borderRadius: "1rem",
                    }}
                  >
                    <div className="row" style={{ padding: "1rem" }}>
                      <div className="col-12">
                        <h2 style={{ color: "white" }}>Type</h2>
                      </div>
                      <div className="col-12">
                        {pokemonDetails.types.map((pok, index) => {
                          return (
                            <span
                              key={index}
                              style={{
                                color: "white",
                                backgroundColor: getTypeColor(pok.type.name),
                                padding: "0.25rem 1rem",
                                borderRadius: "1rem",
                                marginRight: "1rem", // Adjust the margin as needed
                                display: "inline-block", // Ensures proper inline behavior
                              }}
                            >
                              {pok.type.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div
                style={{
                  backgroundColor: "#293444",
                  height: "100%",
                  borderRadius: "1rem",
                  padding: "1rem",
                }}
              >
                <h2 style={{ color: "white" }}>Evolution Chain</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {collectedEvolutions.map((evolution, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <div style={{ margin: "auto 0", fontSize: "1rem" }}>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ color: "white", margin: "0 0.5rem" }}
                          />
                        </div>
                      )}
                      <div style={{ margin: "auto", textAlign: "center" }}>
                        <Link
                          to={`/pokemon/${evolution.name}`}
                          style={{
                            color: "white",
                            textDecoration: "none",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.textDecoration = "underline"; // Change the color on mouse over
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.textDecoration = "none"; // Change the color on mouse over
                          }}
                        >
                          <img
                            className="evolution_img"
                            s
                            src={
                              evolution.sprites.other[`official-artwork`]
                                .front_default
                            }
                            alt={`Evolution ${index + 1}`}
                            // style={{ width: "10rem", height: "10rem" }}
                          />
                          <p
                            style={{
                              color: "white",
                              fontSize: "1rem",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            {evolution.name}
                          </p>
                        </Link>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ margin: "1rem 0" }}>
        <div
          className="col-xl-4 col-lg-4 col-md-12 col-sm-12"
          style={{ margin: "1rem 0 0 0" }}
        >
          <div className="row">
            <div className="col-12">
              <div
                style={{
                  padding: "1rem 0",
                  backgroundColor: "#293444",
                  height: "100%",
                  borderRadius: "1rem",
                }}
              >
                <div className="row" style={{ padding: "1rem" }}>
                  <div className="col-12">
                    <h2 style={{ color: "white" }}>Base Stats</h2>
                  </div>
                  {pokemonDetails.stats.map((stat, index) => {
                    return (
                      <div key={index} className="mb-3">
                        <strong style={{ color: "white" }}>
                          {stat.stat.name}
                        </strong>
                        <div className="progress mt-1">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                              backgroundColor,
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
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-xl-8 col-lg-8 col-md-12 col-sm-12"
          style={{ margin: "1rem 0 0 0" }}
        >
          <div
            style={{
              backgroundColor: "#293444",
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "1rem" }}>Moves</h2>

            <ScrollableTable moves={moveDetails} />
          </div>
        </div>
      </div>
      <div className="row">hi</div>
    </div>
  );
};

export default PokemonDetails;
