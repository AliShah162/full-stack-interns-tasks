import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCards";

function App() {
  return (
    <>
      <Navbar />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1a1a2e',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          Our Products
        </h1>
        
        {/* CSS Grid with place-items-center */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          justifyItems: 'center',
          alignItems: 'start'
        }}>
          
          <ProductCard
            name="Sample Product"
            price={29.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product1"
            description="This is a sample product description."
            rating={4.5}
          />
          <ProductCard
            name="Another Product"
            price={49.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product2"
            description="This is another sample product description."
            rating={4.0}
          />
          <ProductCard
            name="Third Product"
            price={19.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product3"
            description="This is the third sample product description."
            rating={3.5}
          />
          <ProductCard
            name="Fourth Product"
            price={39.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product4"
            description="This is the fourth sample product description."
            rating={4.5}
          />
          <ProductCard
            name="Fifth Product"
            price={59.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product5"
            description="This is the fifth sample product description."
            rating={5.0}
          />
          <ProductCard
            name="Sixth Product"
            price={24.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product6"
            description="This is the sixth sample product description."
            rating={4.2}
          />
          <ProductCard
            name="Seventh Product"
            price={34.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product7"
            description="This is the seventh sample product description."
            rating={4.7}
          />
          <ProductCard
            name="Eighth Product"
            price={44.99}
            image="https://api.dicebear.com/7.x/icons/svg?seed=product8"
            description="This is the eighth sample product description."
            rating={4.3}
          />

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;