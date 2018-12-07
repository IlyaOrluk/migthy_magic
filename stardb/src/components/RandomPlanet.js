import React from 'react';
import SwapiService from '../services/SwapiService';
import Spinner from './Spinner';
import Error from './Error';

import './RandomPlanet.css';

export default class RandomPlanet extends React.Component {
    
    swapiService = new SwapiService();

    state = {
        planet: {
            name: null,
            population: null,
            rotationPeriod: null,
            diameter: null,
            id: ''
            
        },
        loading: true,
        error: false
    };

    constructor() {
        super();
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000);
        // clearInterval(this.interval);
    }

    
    onError = (err) => {
        this.setState({error: true, loading: false})
    };

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});

    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 18 + 3);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
            
    };

    render() {

        const{ planet : { name, population, rotationPeriod, diameter, id }, loading, error } = this.state;
        
        if(loading === true) {
            return <Spinner />;
        } 
        if(error === true) {
            return <Error />;
        }

            return (
                <div className="random-planet jumbotron rounded">
                    <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                    <div>
                        <h4>{name}</h4>
                        <ul className="list-group-item">
                            <li className="list-group-item">
                                <span className="term">Population: </span>
                                <span>{population}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Rotation Period: </span>
                                <span>{rotationPeriod}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Diameter: </span>
                                <span>{diameter}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        
    }
}