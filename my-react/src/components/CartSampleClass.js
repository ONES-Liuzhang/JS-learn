import React, { Component } from "react";

export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [
        {
          name: "商品1",
          id: 1,
        },
        {
          name: "商品2",
          id: 2,
        },
      ],
      carts: [],
      goodName: "",
    };
  }

  txtChange = (e) => {
    const val = e.target.value;
    this.setState({
      ...this.state,
      goodName: val,
    });
  };

  addGood = () => {
    this.setState({
      ...this.state,
      goods: [
        ...this.state.goods,
        {
          name: this.state.goodName,
          id: Math.random(),
        },
      ],
    });
  };

  addToCart = (good) => {
    this.setState({
      ...this.state,
      carts: [
        ...this.state.carts,
        {
          id: good.id,
          good: good,
          count: 1,
        },
      ],
    });
  };

  render() {
    return (
      <div>
        <div>
          <input value={this.state.goodName} onInput={this.txtChange}></input>
          <button onClick={this.addGood}>添加商品</button>
        </div>
        <div>
          <h3>商品列表</h3>
          <ul>
            {this.state.goods.map((g) => (
              <li key={g.id}>
                <span>{g.name}</span>
                <button onClick={() => this.addToCart(g)}>添加到购物车</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>购物车</h3>
          <ul>
            {this.state.carts.map((c) => (
              <li key={c.id}>
                <span>{c.good.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
