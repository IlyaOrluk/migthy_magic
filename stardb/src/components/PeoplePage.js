import React from 'react';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import Error from './Error';
import SwapiService from '../services/SwapiService';
import Row from './Row';



class ErrorBoundry extends React.Component {
    state = {
        hasError: false
    };
    componentDidCatch() {

        this.setState({
            hasError: true
        });
    };

    render() {

        if (this.state.hasError) {
            return <Error />
        }

        return this.props.children;
    }
}

export default class PeoplePage extends React.Component {
    
    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    };

    onPersonSelected = (id) => {
        this.setState({selectedPerson: id});
    };

    nextPerson = () => {
        this.setState({selectedPerson: Number(this.state.selectedPerson) + 1});
        if (this.state.selectedPerson === 16){
            this.setState({selectedPerson: this.state.selectedPerson + 2});
        } else if(this.state.selectedPerson === 88){
            this.setState({selectedPerson: 1 });
        }
    };
    
    prevPerson = () => {
        this.setState({selectedPerson: Number(this.state.selectedPerson) - 1});
        if(this.state.selectedPerson <= 1){
            this.setState({selectedPerson: 88 });
        }
        if (this.state.selectedPerson === 18){
            this.setState({selectedPerson: this.state.selectedPerson - 2});
        }
    };
    

    render() {
        const itemList = (
            <ItemList onPersonSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                    
                      {(i) => (
                            `${i.name} (${i.birthYear})`  
                      )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
            <ItemDetails itemId={this.state.selectedPerson}
                           nextPerson={this.nextPerson}
                           prevPerson={this.prevPerson}/>
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails}/>
        )
    }
}