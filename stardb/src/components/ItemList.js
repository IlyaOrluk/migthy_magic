import React from 'react';
import SwapiService from '../services/SwapiService';
import './ItemList.css';
import Spinner from './Spinner';

export default class ItemList extends React.Component {

    swapiService = new SwapiService();
    
    state = {
        itemList: ''
    };
    
    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onPersonSelected(id)}>
                    {name}
                </li>

            );
            
        });
    }

    render() {
        const{itemList} = this.state;
        if(!itemList){
           return <Spinner />;
        }
        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}