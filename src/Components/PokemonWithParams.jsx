import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import pokemonService from "../Services/pokemonService";
import Loading from "./Loading";
import ListGroup from 'react-bootstrap/ListGroup';

const PokemonWithParams = ({pokemon}) => {

    return <><Card className={"card"}>
        <Link to={"/pokemon/details/"+pokemon.url.substring(41).replaceAll("/", "")} >
            {/* Appel d'API pokemon-species */}
            <Card.Img 
            className="img_card"
            variant="top"
                      src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.url.substring(41).replaceAll("/", "") + ".png"}/>
          
            <Card.Body>
                <Card.Title
                    className={"text-center"}>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.substring(1)} N°{pokemon.url.substring(41).replaceAll("/", "")}</Card.Title>
            </Card.Body>
        </Link>
    </Card>
    </>;
};

export default PokemonWithParams;