// import Clicker from "./components/Clicker"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";

function App() {
  return (
    <>
     
  <Navbar />
      <UserCard
        name={"Ali"}
        role={"Developer"}
        email={"nalain@gmail.com"}
        location={"New York"}
        phone={"123-456-7890"}
        avatar={null}
      />
      <ProductCard
        name={"Wireless Headphones"}
        price={99.99}
        image={null}
        description={
          "High-quality wireless headphones with noise cancellation."
        }
        rating={4.5}
      />


        <Footer  />
    </>
  );
}

export default App;
