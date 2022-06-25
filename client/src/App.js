import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      return await fetch(
        `${process.env.REACT_APP_API_URL}/store/products`
      ).then((response) => response.json());
    };

    getNotes()
      .then((json) => {
        console.log(json);
        setOrders(json);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {orders && (
        <ul>
          {orders.map((product) => (
            <li key={product.id}>
              <h3>
                🧵{product.category} :::{product.name} ::: {product.price}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
