import { connect } from "react-redux";

function StateSample(props) {
  const { list } = props;
  const { addTodo, deleteItem } = props;

  return (
    <div>
      <button onClick={() => addTodo(Math.random())}>增加一项</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            <span>{item}</span>
            <button onClick={() => deleteItem(item)}> - </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo(payload) {
      dispatch({ type: "ADD", payload });
    },
    deleteItem(payload) {
      dispatch({ type: "DELETE", payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StateSample);
