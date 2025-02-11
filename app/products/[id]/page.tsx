import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { GetServerSideProps } from "next";


type Props ={
    params:{id:string;};
}


const ProductDetails = async ({ params }: Props) =>{
    // const {id} = params;

    // const product = await getProductById(id);

    // if(!product) redirect('/')

    if (!params || !params.id) {
        console.error("No product ID found in params.");
        redirect("/");
        return null;
      }
    const id = params.id;

    try {
        const product = await getProductById(id);
        if (!product) {
          console.error(`Product not found: ${id}`);
          redirect("/");
          return null;
        }


        

    const similarProducts = await getSimilarProducts(id);
    const actualBuyers = product.reviewsCount;
   

    return (
        <div className ="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="mx-auto"
                    />
                </div>
                <div className= "flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] text-secondary font semi-bold">
                                {product.title}
                            </p>
                            <Link
                             href={product.url}
                             target="_blank"
                             className="text-base text-black opacity-50"
                            >
                                Visit Product
                            </Link>
                        </div>


                        <div className = "flex items-center gap-3">
                            <div className="products-heart">
                               <Image
                                 src="/assets/icons/red-heart.svg"
                                 alt="heart"
                                 width={20}
                                 height={20}
                                />

                                <p className="text-base font-semibold text-[#D46F77]">
                                {product.reviewsCount}
                                </p>
                             </div>

                            <div className ="p-2 bg-white-200 rounded-10">
                             <Image
                                src="/assets/icons/bookmark.svg"
                                alt="bookmark"
                                width={20}
                                height={20}
                             />
                            </div>

                            <div className ="p-2 bg-white-200 rounded-10">
                             <Image
                                src="/assets/icons/share.svg"
                                alt="share"
                                width={20}
                                height={20}
                             />
                            </div>
                        </div>                      
                    </div>
                        <div className="product-info">
                            <div className="flex flex-col gap-2">
                                <p className="text-[34px] text-secondary font-bold">
                                    {product.currency} {formatNumber(product.currentPrice)}
                                </p>
                                <p className="text-[21px] text-black opacity-50 line-through">
                                    {product.currency} {formatNumber(product.originalPrice)}
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-3">
                                    <div className="product-stars">
                                        <Image
                                            src="/assets/icons/star.svg"
                                            alt="star"
                                            width={16}
                                            height={16}
                                        />
                                        <p className="text-sm text-primary-orange font-semi-bold">
                                            {product.stars || 25}
                                        </p>
                                    </div>

                                    <div className="product-reviews">
                                        <Image
                                            src="/assets/icons/comment.svg"
                                            alt="comment"
                                            width={16}
                                            height={16}
                                        />
                                        <p className=" text-sm text-secondary font-semi-bold">
                                            {product.reviewsCount} Reviews
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-black opacity-50">
                                    <span className="text-primary-green font-semibold">{actualBuyers}+</span> of buyers have recommended this.
                                </p>
                            </div>
                        </div>

                        <div className="my-7 flex flex-col gap-5">
                            <div className= "flex gap-5 flex-wrap">
                                <PriceInfoCard
                                    title="Current Price"
                                    iconSrc="/assets/icons/price-tag.svg"
                                    value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                                    borderColor="#A1E3F9"                               
                                />
                                <PriceInfoCard
                                    title="Average Price"
                                    iconSrc="/assets/icons/chart.svg"
                                    value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                                    borderColor="#B2A5FF"                               
                                />
                                <PriceInfoCard
                                    title="Highest Price"
                                    iconSrc="/assets/icons/arrow-up.svg"
                                    value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                                    borderColor="#D70654"                               
                                />
                                <PriceInfoCard
                                    title="Lowest Price"
                                    iconSrc="/assets/icons/arrow-down.svg"
                                    value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                                    borderColor="#A0C878"                               
                                />
                            </div>
                        </div>

                        <Modal 
                             productId={id}
                         />
                </div>
            </div>

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl text-primary font-semibold">
                        Product description
                    </h2>
                    <div className="flex flex-col gap-4">
                        {product?.description?.split("\n")}
                        {/* <p className="section-text">
                                
                        </p> */}
                    </div>
                </div>
                <button className="btn w-fit mx-auto flex item-center justify-center gap-3 min-w-[200px]">
                    <Image
                        src="/assets/icons/bag.svg"
                        alt="check"
                        width={22}
                        height={22}
                    />
                    <Link href={product.url} className="text-base text-white">
                        Buy Now
                    </Link>
                </button>
            </div>
            {similarProducts && similarProducts?.length > 0 && (
                <div className="py-14 flex flex-col gap-2 w-full">
                    <p className ="section-text">
                        Similar Products
                    </p>

                    <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProducts.map((product)=>(
                            <ProductCard
                            key={product._id}
                            product ={product}
                            />
                        ))}


                    </div>

                </div>
            )}

        </div>
    )
}
catch (error) {
    console.error("Error fetching product:", error);
    redirect("/");
    return null;
  }
};

export default ProductDetails