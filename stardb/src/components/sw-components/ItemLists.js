import React from 'react';
import ItemList from '../ItemList';
import  withData  from '../hoc-helpers/withData';
import SwapiService from '../../services/SwapiService';
import withChildFunction from '../hoc-helpers/withChildFunction';

const swapiService = new SwapiService();

const {
    getAllPeople,
    getAllStarships,
    getAllPlanets
} = swapiService;


const renderName = ({name}) => <span>{name}</span>;

const PersonList = withData(
                        withChildFunction(ItemList, renderName),
                        getAllPeople);
const PlanetList = withData(
                        withChildFunction(ItemList, renderName),
                        getAllPlanets);
const StarshipList = withData(
                        withChildFunction(ItemList, renderName),
                        getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
};