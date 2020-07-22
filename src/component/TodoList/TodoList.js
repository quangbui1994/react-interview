import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './TodoList.module.css';
import Todo from '../Todo/Todo';

const TodoList = ({ todos }) => {
    return (
        <TransitionGroup className={styles.TodoList}>
            {
                todos.map(todo => 
                    <CSSTransition
                        key={todo.id}
                        timeout={200}
                        mountOnEnter
                        classNames={{
                            enter: styles.itemEnter,
                            enterActive: styles.itemEnterDone,
                            exitActive: styles.itemExitDone,
                            exitDone: styles.itemExitDone
                        }}>
                        <Todo 
                            id={todo.id}
                            name={todo.name} 
                            complete={todo.complete}/>
                    </CSSTransition>
                )
            }
        </TransitionGroup>
    );
};

export default React.memo(TodoList);