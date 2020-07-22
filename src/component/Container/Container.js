import React, { useState, useContext } from 'react';

import { Context as TodoContext } from '../../context/TodoContext';
import styles from './Container.module.css';
import { getDay, getDate } from '../../libs/helpers';
import TodoList from '../TodoList/TodoList';
import { ReactComponent as Task } from '../../assets/icons/task.svg';

const Container = () => {
    const { state: { todos }, addTodo } = useContext(TodoContext);
    const [todoName, setTodoName] = useState('');
    const [error, setError] = useState('');

    const newTodo = (e) => {
        e.preventDefault();
        // Check if the field is empty
        if (todoName) {
            // Check if the task name already exist. If yes, clear the field and do not 
            // add the task
            const existingTask = todos.find(todo => todo.name.toLowerCase() === todoName.toLowerCase());
            if (existingTask) {
                setError('Task exists already');
                return setTodoName('');
            };
            addTodo(todoName);
            setTodoName('');
        } else {
            setError('You have to enter the task first');
        }
    };

    const onChangeHandler = e => {
        setError('');
        setTodoName(e.target.value);
    };
    
    return (
        <div className={styles.Container}>
            <div className={styles.heading}>
                <div>
                    <h2 className={styles.day}>{getDay()}</h2>
                    <h2 className={styles.date}>{getDate()}</h2>
                </div>
                <Task className={styles.logo}/>
            </div>
            <form onSubmit={newTodo}>
                {error.length > 0 && <p className={styles.errorMessage}>{error}</p>}
                <input value={todoName} onChange={onChangeHandler} type="text" placeholder="Add a task..."/>
            </form>
            {todos.length > 0 ? <TodoList todos={todos}/> : <p className={styles.callToAction}>You have no task more. Please add some!!!</p>}
        </div>
    );
};

export default Container;