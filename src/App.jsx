import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const [data,setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 5
  
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);
    const updatedCart = [...cart];
  
    if (itemExists !== -1) {
      // Si el elemento ya existe en el carrito, incrementa su cantidad
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // Si el elemento no existe, establece su cantidad a 1 y lo agrega al carrito
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantify(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
     return item
    } )
    setCart(updatedCart)
  }


  return (
    <>
    <Header 
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantify={increaseQuantify}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        
      {data.map((guitar) => (
        <Guitar
            key={guitar.id} 
            guitar={guitar}
            setCart={setCart}
            addToCart={addToCart}
        />
      ))}
      

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
