import React, { Component } from "react";

const compose = (...fns) => {
  const start = fns.length - 1;
  return function(...args) {
    let i = start;
    let result = fns[start].apply(this, args);
    while (i--) result = fns[i].call(this, result);
    return result;
  }
};

// Condition
const isTodosNull = (props) => !props.todos;
const isTodosEmpty = (props) => !props.todos.length;
const isTodosLoading = (props) => props.isloading;

// EitherComp
const emptyTodos = () => {return <div><p>You have no Todos.</p></div>}
const loadingTodos = () => {return <div><p>Loading todos ...</p></div>}

// HOC
const withMaybeNull = isNull => Comp => (props) => {
  return isNull(props)
    ? null
    : <Comp { ...props } />
}
const withEither = (conditionalRenderFn, EitherCom) => (Comp) => (props) => {
  return conditionalRenderFn(props)
    ? <EitherCom />
    : <Comp { ...props } />
}
const todosWithHOC = compose(
  withEither(isTodosEmpty, emptyTodos),
  withMaybeNull(isTodosNull), 
  withEither(isTodosLoading, loadingTodos)
)

// Components
const TodoList = (props) => {
  const { todos, isloading } = props
  return (
    <div>
      { todos.map(todoItem => <TodoItem key={todoItem.id} todo={todoItem} />) }
    </div>
  )
}
const TodoItem = (props) => {
  return <div>todo: {props.todo.content}</div>
}

// render
const TodosRender = todosWithHOC(TodoList)

class App extends Component {
  state = {
    todo: [
      {id: 1, content: 'eat some cake'},
      {id: 2, content: 'drink some juice'},
      {id: 3, content: 'take a break'}
    ],
    isloading: false
  }
  render() {
    let {isloading, todo} = this.state
    return (
      <div>
        <TodosRender isloading={isloading} todos={todo}></TodosRender>
      </div>
    );
  }
}

export default App
