import React from 'react';
import Header from './Header';
import RandomPlanet from './RandomPlanet';
import PeoplePage from './PeoplePage';
import ErrorBtn from './ErrorBtn';
import Error from './Error';
import Row from './Row';
import SwapiService from '../services/SwapiService';

import './App.css';
import ItemDetails, { Record } from './ItemDetails';


export default class App extends React.Component {
    
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: false,
        selectedPerson: 11,
        hasError: false
    };
    
    componentDidCatch() {
        console.log('Global Error!');
        this.setState({hasError: true});
    }

    onPersonSelected = (id) => {
        this.setState({selectedPerson: id});
    };
    
    render() {
        const{showRandomPlanet} = this.state;
        const toggleRandomPlanet = showRandomPlanet ? '' : <RandomPlanet />;
        const btnRandomPlanet = showRandomPlanet ? 'Show Random Planet ' : 'Hide Random Planet ';
        const btnIcons = showRandomPlanet ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>;
        
        if(this.state.hasError){
            return <Error />
        }

        const { getPerson,
                getStarship,
                getPlanet,
                getPersonImage,
                getStarshipImage,
                getPlanetImage } = this.swapiService;

        const personDetails =(
            <ItemDetails 
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >
                
                <Record field="gender" label="Gender: " />
                <Record field="eyeColor" label="Eye Color: " />

            </ItemDetails>
        );

        const starshipDetails =(
            <ItemDetails 
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

            <Record field="model" label="Model: " />
            <Record field="length" label="Length: " />
            <Record field="costInCredits" label="Cost: $" />
                

            </ItemDetails>
            );

        return (
        
            <div>
                <Header />
                {toggleRandomPlanet}
                <button className='btn'
                        onClick={() => this.setState({showRandomPlanet: !showRandomPlanet})}>
                        {btnRandomPlanet}{btnIcons}
                </button>
                <ErrorBtn />
                <Row
                left={personDetails}
                right={starshipDetails}
                />
            </div>
        );
    }
        
        
    
    
}


