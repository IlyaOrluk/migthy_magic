import React from 'react';
import Spinner from './Spinner';
import Error from './Error';
import SwapiService from '../services/SwapiService';
import ErrorBtn from './ErrorBtn';

import './ItemDetails.css';

const Record = ({ item, field, label}) => {
    return  <li className="list-group-item">
                <span className="term">{label}</span>
                <span>{ item[field] }</span>
            </li>
}
export { Record };
export default class ItemDetails extends React.Component {

    swapiService = new SwapiService();
    

    constructor(props) {
        super(props);

        
        // this.componentDidMount();

    }

    state = {
        item: '',
        image: ''
    };

    
    componentDidMount() {
        this.updateItem(this.props.itemId);
        console.log('mount');
        console.log(this.state.item);
    };

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem(this.props.itemId);
            console.log('update');
        }
    };

    onError = (err) => {
        this.setState({error: true, loading: false})
    };

    updateItem() {
      
        if (itemId){
            return;
        }
        const{itemId, getData} = this.props;
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: this.props.getImageUrl(item)
                });
                console.log(this.state.item);
            });
        }

    onItemLoaded = (item) => {
        this.setState({item, loading: false});
    };
    
    render() {
        const{item,image} = this.state;
        const{ id, name, gender, birthYear, eyeColor } = item;
        const{itemId} = this.props;
        console.log(id);
        console.log(itemId);
        // if(this.state.loading === true) {
        //     return <Spinner />;
        // }
        // if(this.state.error === true) {
        //     return <Error />;
        // }
        return (
            <div className="person-details card">
                
                <img className="person-image" src={image} />
                
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        
                    {
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { item });
                    })

                }

                    </ul>
                    <button className="btn" onClick={this.props.prevPerson}><i className="fas fa-chevron-left"></i></button>
                    <button className="btn" onClick={this.props.nextPerson}><i className="fas fa-chevron-right"></i></button>
                    <ErrorBtn />
                </div>
            </div>
        );
    }
}