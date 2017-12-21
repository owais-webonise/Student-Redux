import React, {Component} from 'react';
import { SEARCH_STUDENT, UPDATE_DATA } from './components/constants';

let initialState = { allResults: [], updatedResults: [] };

export default function(state = initialState,action) {
    switch(action.type) {
        case 'UPDATE_DATA':
            return {
                ...state,
                allResults: action.payload
            }
        case 'SEARCH_STUDENT': 
            state.updatedResults = Object.assign([],state.allResults);
            return {
                ...state,
                updatedResults: state.updatedResults.filter(item => {
                    return (item.firstName.toUpperCase().indexOf(action.payload.toUpperCase()) > -1 || item.lastName.toUpperCase().indexOf(action.payload.toUpperCase()) > -1);
                })
            }
           
        default:
            return state;    
    }
}
