import React, { Component } from 'react';
import { SEARCH_STUDENT, UPDATE_DATA } from './components/constants';

export function updateData(text) {
    return {
        type: 'UPDATE_DATA',
        payload: text
    }
}

export function searchStudent(text) {
    return {
        type: 'SEARCH_STUDENT',
        payload: text
    }
}
