import React from 'react';
import Header from './Header';
import RandomPlanet from './RandomPlanet';
import ItemList from './ItemList';
import PersonDetails from './PersonDetails';

import './App.css';

export default class App extends React.Component {
    
    state = {
        showRandomPlanet: false,
        selectedPerson: 11
    };
    
    onPersonSelected = (id) => {
        this.setState({selectedPerson: id});
    };
    
    render() {
        const{showRandomPlanet} = this.state;
        const toggleRandomPlanet = showRandomPlanet ? '' : <RandomPlanet />;
        const btnRandomPlanet = showRandomPlanet ? 'Show Random Planet ' : 'Hide Random Planet ';
        const btnIcons = showRandomPlanet ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>;
        
        return (
            <div>
                <Header />
                {toggleRandomPlanet}
                <button className='btn'
                        onClick={() => this.setState({showRandomPlanet: !showRandomPlanet})}>
                        {btnRandomPlanet}{btnIcons}
                </button>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onPersonSelected={this.onPersonSelected} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        );
    }
        
        
    
    
}


