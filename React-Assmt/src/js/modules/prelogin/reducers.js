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
            var payload = action.payload.toUpperCase();
            return {
                ...state,
                updatedResults: state.updatedResults.filter(item => {
                    return (item.firstName.toUpperCase().indexOf(payload) > -1 || item.lastName.toUpperCase().indexOf(payload) > -1);
                })
            }
           
        default:
            return state;    
    }
}
