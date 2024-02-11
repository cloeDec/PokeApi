import React from 'react';

const PokemonTypes = ({types}) => {
    console.log(types)
    return <div>
        <h4>Types</h4>
        <div>
            <ul>
                {types.map(type => {
                    return <li className={type.type.name}>{type.type.name}</li>
                })}
            </ul>
        </div>
    </div>;
};

export default PokemonTypes;