import React from 'react'
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {client, urlFor} from '../../lib/client'
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

//this functions purpose is to generate the product page based on the 
//slug of the page
const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index,setIndex]=useState(0);
    const { decQty, incQty, qty,onAdd } = useStateContext();

  return (
    <div>
      {/** this section is to generate the feature image and the carousel of the page */}
        <div className='product-detail-container'>
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

            <div className='product-detail-desc'>
              <h1>{name}</h1>
              <div className='reviews'>
                  <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                   <AiOutlineStar />
                  </div>
                  <p>
                    (20)
                  </p>
              </div>

              <h4> Deatils:</h4>
              <p>{details}</p>
              <p className='price'>${price}</p>
              <div className='quantity'>
                  <h3> Quantity:</h3>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                    <span className='num'>{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                  </p>
              </div>
              <div className='buttons'>
                  <button type='button' className='add-to-cart' onClick={() => onAdd(product,qty)}>Add to Cart</button>
                  <button type='button' className='buy-now' onClick=''>Buy Now</button>
              </div>
            </div>
        </div>


        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>

    </div>
  )
}

// this section is to pre-render all the links and routes to the product pages

//if you use getStaticProps, you also need this to generate the pre-rendered paths
export const getStaticPaths = async () => {
  //this returns only the slug from the sanity product cataloge
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  // To query for a document with a given slug, make sure you put on the "current" key
  // the round brackets used before the {} means you are creating an object
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}
//if you already know what the user wants to see then you can use static props, 
//the data required to render the page is available ahead of the user request
//use serverside props for dynamic processing (when the page request is made, then it runs)
export const getStaticProps=async ({ params: { slug }})=>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;
  
    const product=await client.fetch(query);
    const products= await client.fetch(productsQuery);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails