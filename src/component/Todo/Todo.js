import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Todo.module.css';
import { useTodoContext } from '../../context/TodoContext';
import { ReactComponent as Trash } from '../../assets/icons/trash.svg';
import { getHours, getDay } from '../../libs/helpers';

const Todo = ({ id, name, complete }) => {
    // The custom hook useTodoContext imported from TodoContext file is used
    // instead of standard useContext for testing purpose.
    const { removeTodo, toggleTodo } = useTodoContext();

    const removeTodoById = id => {
        removeTodo(id);
    };

    const toggleTodoById = id => {
        toggleTodo(id);
    };

    return (
        <div data-test='component-todo' className={cx(styles.Todo, complete ? styles.complete : null)}>
            <div>
                <p data-test='component-name-todo' className={styles.name}>{name}</p>
                <p className={styles.description}>{`${getHours()}, ${getDay()}`}</p>
            </div>
            <Trash
                data-test="component-delete-icon"
                onClick={() => removeTodoById(id)}
                className={styles.removeIcon}/>
            <input 
                data-test="component-checkbox"
                type="checkbox" 
                checked={complete} 
                onChange={() => toggleTodoById(id)}/>
        </div>
    );
};

Todo.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    complete: PropTypes.bool,
};
 
export default React.memo(Todo);