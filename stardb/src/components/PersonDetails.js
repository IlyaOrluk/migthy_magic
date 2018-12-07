import React from 'react';
import Spinner from './Spinner';
import Error from './Error';
import SwapiService from '../services/SwapiService';
import './PersonDetails.css';

export default class PersonDetails extends React.Component {

    swapiService = new SwapiService();
    

    constructor(props) {
        super(props);

        
        this.componentDidMount();

    }

    state = {
        person: {
            id: this.props.personId,
            name: '',
            gender: '',
            birthYear: '',
            eyeColor: ''
        },
        loading: true,
        error: false
    };

    
    componentDidMount() {
        this.setState({person:{id: this.props.personId}});
        this.loadPerson(this.props.personId);
        console.log('mount');

    };

    componentDidUpdate() {
        if (this.props.personId !== this.state.person.id) {
            this.setState({person:{id: this.props.personId},loading: true});
            this.loadPerson(this.props.personId);
            console.log('Update: done!');
        }
    };
    onError = (err) => {
        this.setState({error: true, loading: false})
    };

    loadPerson = (id) => {
        fetch(`https://swapi.co/api/people/`+id+ `/`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`Could not fetch` + `, recived ${res.status}`)
                    }
                return res.json();
            })
            .then((person) => {
                this.setState({
                    person:{id: id, name: person.name,
                    gender: person.gender,
                    birthYear: person.birth_year,
                    eyeColor: person.eye_color},
                    loading: false
                });
            })
            .catch(this.onError);      
    }
    

    onPersonLoaded = (person) => {
        this.setState({person, loading: false});
    };
    
    render() {
        const{person:{ id, name, gender, birthYear, eyeColor }} = this.state;
        const{personId} = this.props;
        console.log(id);
        console.log(personId);
        if(this.state.loading === true) {
            return <Spinner />;
        }
        if(this.state.error === true) {
            return <Error />;
        }
        return (
            <div className="person-details card">
                <img className="person-image" src={`https://starwars-visualguide.com/assets/img/characters/${this.state.person.id}.jpg`} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender: </span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year: </span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color: </span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}