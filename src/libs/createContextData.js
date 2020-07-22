import React, { useReducer } from 'react';

/**
 * The Function obtains reducer, actions and state as parameters
 *  then returns a provider which
 * could pass data through the component tree and allow children
 * directly change the state of application 
 * @param {Function} reducer Function reducer returns the list of todos based on the actions
 * @param {Function} actions List of actions send data to the store
 * @param {Object} defaultValue A initial state of application
 */
const createDataContext = (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
        const boundingActions = {};
        for (let key in actions) {
            boundingActions[key] = actions[key](dispatch);
        };
        return (
            <Context.Provider value={{state, ...boundingActions}}>
                {children}
            </Context.Provider>
        );
    };
    return { Context, Provider };
};

export default createDataContext;