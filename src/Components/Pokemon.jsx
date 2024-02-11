import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import pokemonService from "../Services/pokemonService";
import Loading from "./Loading";
import ListGroup from "react-bootstrap/ListGroup";

const Pokemon = ({ pokemon }) => {
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPokemonById = async () => {
    try {
      const response = await pokemonService.getPokemonById(
        pokemon.url.substring(41).replaceAll("/", "")
      );
      setCurrentPokemon(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPokemonById();
  }, []);

  return (
    <>
      {loading == false ? (
        <Card className={"card"}>
          <Link to={"/pokemon/details"} state={currentPokemon}>
            {/* appel d'API pokemon-species */}
            <Card.Img 
            className="img_card"
              variant="top"
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
                pokemon.url.substring(41).replaceAll("/", "") +
                ".png"
              }
            />
            <Card.Body>
              <Card.Title className={"text-center"}>
                {currentPokemon.names != undefined &&
                  currentPokemon.names[4].name.charAt(0).toUpperCase() +
                    currentPokemon.names[4].name.substring(1)}{" "}
                <br />
              </Card.Title>{" "}
              <div className="number_poke">N°{currentPokemon.id}</div>
              <ListGroup variant="flush">
                {currentPokemon.egg_groups.map((type) => {
                  return (
                    <ListGroup.Item key={type.name}>{type.name}</ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Link>
        </Card>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Pokemon;
