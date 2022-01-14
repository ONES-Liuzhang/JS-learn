import { useState } from "react";

function CartSample() {
  // 商品
  const [goods, setGoods] = useState([]);
  // 购物车
  const [carts, setCarts] = useState([]);
  // 增加商品名
  const [goodName, setGoodName] = useState("");

  const handleGoodInput = (e) => {
    const val = e.target.value;
    setGoodName(val);
  };

  const addGood = () => {
    const good = goods.find((g) => g.name === goodName);

    if (good) return;

    setGoods([
      ...goods,
      {
        name: goodName,
        id: Math.random(),
      },
    ]);
  };

  const addGoodToCart = (good) => {
    const copyCart = [...carts];
    const currGood = copyCart.find((c) => c.good.id === good.id);

    if (currGood) {
      currGood.count++;
    } else {
      copyCart.push({
        good,
        count: 1,
      });
    }

    setCarts(copyCart);
  };

  const addGoodCount = (cart) => {
    const copyCart = [...carts];
    const currCart = copyCart.find((c) => c.good.id === cart.good.id);

    currCart.count++;

    setCarts(copyCart);
  };

  const reduceGoodCount = (cart) => {
    const copyCart = [...carts];
    const currCart = copyCart.find((c) => c.good.id === cart.good.id);

    currCart.count = Math.max(0, currCart.count - 1);

    setCarts(copyCart);
  };

  return (
    <div>
      <div>
        <input value={goodName} onInput={handleGoodInput}></input>
        <button onClick={addGood}>添加商品</button>
      </div>
      <div>
        <h3>商品列表</h3>
        <ul className="good-list">
          {goods.map((good) => (
            <li key={good.id}>
              <span>{good.name}</span>
              <button onClick={() => addGoodToCart(good)}>添加到购物车</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>购物车</h3>
        <ul className="cart-list">
          {carts.map((c) => (
            <li key={c.good.id}>
              <span> {c.good.name} </span>
              <button onClick={() => reduceGoodCount(c)}> - </button>
              <span> {c.count} </span>
              <button onClick={() => addGoodCount(c)}> + </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CartSample;
