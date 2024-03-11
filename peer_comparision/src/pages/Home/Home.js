import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const [pokemon, setPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPokemon, setSearchPokemon] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch(`${apiUrl}?limit=100&offset=0`);
      let data = await response.json();
      setPokemon(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchData = async () => {
    try {
      let response = await fetch(`${apiUrl}?limit=10000&offset=0`);
      let data = await response.json();
      setSearchPokemon(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchSearchData();
  }, []); // Fetch search data once on mount

  const searchFilter = searchPokemon.filter((pok) =>
    pok.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container p-4">
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Pokemon Name or Id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.25rem",
            width: "100%",
            borderRadius: "0.5rem",
            paddingLeft: "2rem", // Add padding on the left for the icon
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "8px", // Adjust the left position of the icon
            transform: "translateY(-50%)",
            color: "rgba(0, 0, 0, 0.4)", // Adjust the color of the icon
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </span>
        {searchQuery !== "" && searchPokemon && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "#293444",
              width: "100%",
              zIndex: "100",
              textTransform: "capitalize",
              borderRadius: "0.5rem",
            }}
          >
            {searchFilter.slice(0, 5).map((pok, index) => (
              <Link
                to={`/pokemon/${pok.name}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    color: "grey",
                    textDecoration: "none",
                  }}
                  key={index}
                  onMouseOver={(e) => {
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "grey";
                  }}
                >
                  {pok.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="row">
          {pokemon.map((pok, index) => (
            <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <Link
                to={`/pokemon/${pok.name}`}
                style={{ textDecoration: "none" }}
              >
                <PokemonCard pok={pok} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
