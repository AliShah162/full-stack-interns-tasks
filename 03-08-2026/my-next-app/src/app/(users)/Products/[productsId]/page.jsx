export default async function products({ params }) {  
  const { productsId } = await params;//The name inside the brackets [ ] becomes the variable name you destructure from params.     
  return <div>
    product details of {productsId}
  </div>
}