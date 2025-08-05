import { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Route/Footer'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'

function ProductDetailsPage() {
    const {name} = useParams();
    const [data,setData] = useState(null);
    const productName = name.
  return (
    <div>
        <Header/>
        <ProductDetails/>
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage