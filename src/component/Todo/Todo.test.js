import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

import Todo from './Todo';
import * as TodoContext from '../../context/TodoContext';
import { Context } from '../../context/TodoContext';

/**
 * Return shallow wrapper containing nodes with searched data
 * @param {ShallowWrapper} wrapper Enzyme shallow wrapper to search component
 * @param {string} val Value of data test attribute to search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('Test Todo component', () => {
    let wrapper;
    let removeTodo;
    let toggleTodo;
    let props;
    
    beforeEach(() => {
        props = {
            id: '12377123-12384-23',
            name: 'Call Alice',
            complete: false,
        };
        //Due to Enzyme does not support for shallow mock on a component
        // which contains useContext, so I use Jest spy to mock the provider.
        // The custom hook useTodoContext which returns the values for application
        // is mocked and the values, two functions, are injected as needed.
        removeTodo = jest.fn();
        toggleTodo = jest.fn();
        jest
            .spyOn(TodoContext, 'useTodoContext')
            .mockImplementation(() => ({ removeTodo, toggleTodo }));
        
        wrapper = shallow(
            <Context.Provider>
                <Todo {...props}/>
            </Context.Provider>
        ).dive();
    }); 

    test('renders correctly', () => {
        const TodoComponent = findByTestAttr(wrapper, 'component-todo');
        expect(TodoComponent.length).toBe(1);
    });

    test('displays correct todo name', () => {
        const NameComponent = findByTestAttr(wrapper, 'component-name-todo');
        expect(NameComponent.text()).toEqual(props.name);
    });

    test('renders delete icon properly', () => {
        const DeleteIconComponent = findByTestAttr(wrapper, 'component-delete-icon');
        expect(DeleteIconComponent.length).toBe(1);
    });

    test('renders checkbox properly', () =>{
        const CheckboxComponent = findByTestAttr(wrapper, 'component-checkbox');
        expect(CheckboxComponent.length).toBe(1);
    });

    test('checkbox should not be checked initially', () => {
        const CheckboxComponent = findByTestAttr(wrapper, 'component-checkbox');
        expect(CheckboxComponent.props().checked).toEqual(false);
    });

    test('does not throw error with expected props', () => {
        const error = checkPropTypes(Todo.propTypes, props, 'prop', Todo.name);
        expect(error).toBeUndefined();
    });

    test('delete icon clicked triggers removeTodo function', () => {
        const DeleteIconComponent = findByTestAttr(wrapper, 'component-delete-icon');
        DeleteIconComponent.simulate('click');
        expect(removeTodo).toHaveBeenCalled();
    });

    test('checkbox clicked triggers toggleTodo function', () => {
        const CheckboxComponent = findByTestAttr(wrapper, 'component-checkbox');
        CheckboxComponent.simulate('change');
        expect(toggleTodo).toHaveBeenCalled();
    }); 
});      
  
