import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Header from './layout/Header';
import Todos from './Todos';
import axios from 'axios';
import Footer from '../store/containers/Footer';

function TodoApp() {
    const [state, setState] = useState({
        todos: [],
    });

    const handleCheckboxChange = (id) => {
        setState({
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        });
    };

    const deleteTodo = (id) => {
        setState({
            todos: [
                ...state.todos.filter((todo) => {
                    return todo.id !== id;
                }),
            ],
        });
    };

    const addTodo = (title) => {
        const todoData = {
            title: title,
            completed: false,
        };

        axios
            .post('https://jsonplaceholder.typicode.com/todos', todoData)
            .then((res) => {
                console.log(res.data);
                setState({ todos: [...state.todos, res.data] });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const config = {
            params: {
                _limit: 5,
            },
        };

        axios
            .get('https://jsonplaceholder.typicode.com/todos', config)
            .then((res) => setState({ todos: res.data }))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container">
            <Header />
            <AddTodo addTodo={addTodo} />
            <Todos
                todos={state.todos}
                handleChange={handleCheckboxChange}
                deleteTodo={deleteTodo}
            />
            <Footer />
        </div>
    );
}
export default TodoApp;
