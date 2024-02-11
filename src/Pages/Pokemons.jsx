import React, { useEffect, useState } from "react";
import pokemonService from "../Services/pokemonService";
import Pokemon from "../Components/Pokemon";
import PaginationPerso from "../Components/PaginationPerso";
import pokemon from "../Components/Pokemon";
import Searchicon from "../search-outline.svg";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(21);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [maxPage, setMaxPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueAll, setSearchValueAll] = useState("");
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);

  const fetchPokemons = async () => {
    try {
      let nombrePokemonAffiche = pokemonPerPage * (currentPage - 1);
      const response = await pokemonService.getPokemons(
        nombrePokemonAffiche,
        pokemonPerPage
      );
      setTotalPokemon(response.data.count);
      setMaxPage(Math.ceil(response.data.count / pokemonPerPage));
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
  }, [currentPage]);

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


      <div className={"d-flex flex-wrap gap-2 justify-content-center"}>
        {pokemonsFiltered.map((poke) => {
          return <Pokemon key={poke.name} pokemon={poke} />;
        })}
      </div>
      <div className={"d-flex justify-content-center"}>
        <PaginationPerso
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
      </div>
    </>
  );
};

export default Pokemons;
