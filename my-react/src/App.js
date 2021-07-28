import { connect } from "react-redux";

const onUpdate = (...args) => {
  console.log(args);
  debugger;
};

function App(props) {
  const { list } = props;
  const { addTodo, onUpdate } = props;

  return (
    <div className="App">
      <ul>
        {list.map((item) => (
          <li key={item} onClick={() => onUpdate(item)}>
            {item}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo(Math.random())}>点击我增加</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo(payload) {
      setTimeout(() => {
        dispatch({ type: "ADD", payload });
      }, 1000);
    },
    deleteItem(payload) {
      dispatch({ type: "DELETE", payload });
    },
    onUpdate(payload) {
      dispatch(onUpdate);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
