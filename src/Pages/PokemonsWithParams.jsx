import React, { useEffect, useState } from "react";
import pokemonService from "../Services/pokemonService";
import PokemonWithParams from "../Components/PokemonWithParams";
import Searchicon from "../search-outline.svg";

const PokemonsWithParams = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueAll, setSearchValueAll] = useState("");
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await pokemonService.getPokemons();
      setPokemons(response.data.results);
      setPokemonsFiltered(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAllPokemon = async () => {
    try {
      const response = await pokemonService.getAllPokemons();
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };
  const handleChangeAll = (e) => {
    setSearchValueAll(e.currentTarget.value);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (searchValue != null) {
      let res = pokemons.filter((poke) => {
        return poke.name.startsWith(searchValue.toLowerCase());
      });
      setPokemonsFiltered(res);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValueAll != null && searchValueAll != "") {
      let res;
      fetchAllPokemon().then((response) => {
        res = response;
        let resFiltered = res.results.filter((poke) => {
          return poke.name.startsWith(searchValueAll.toLowerCase());
        });
        setPokemonsFiltered(resFiltered);
      });
    } else {
      fetchPokemons();
    }
  }, [searchValueAll]);

  return (
    <>
      <h1 className={"text-center"}>Liste des Pokémons</h1>

      {/* Barre de recherche  */}
      <div className="search">
        <input
          className={"search_bars"}
          placeholder="Rechercher un Pokemon"
          value={searchValueAll}
          onChange={handleChangeAll}
        />
        <img className="searchicon" src={Searchicon} />
      </div>

      {/* Card pokemon */}
      <div className={"d-flex flex-wrap gap-2 justify-content-center"}>
        {pokemonsFiltered.map((poke) => {
          return <PokemonWithParams key={poke.name} pokemon={poke} />;
        })}
      </div>
    </>
  );
};

export default PokemonsWithParams;
