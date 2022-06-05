import React, { useState, useContext } from 'react'
import { GravityContext } from '../context/GravityContext'
import Card from './Card'



const Cards = () => {

    const styles = {
        container: `h-full flex flex-col wmt-[50px]`,
        title: `text-xl font-bolder mb-[30px] mt-[30px]`,
        cards: `flex items-center flex-wrap gap-x-[25px] gap-y-[120px]`
    }

    const { products } = useContext(GravityContext)

    // console.log(products)

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Collectible Sneakers
            </div>
            <div className={styles.cards}>
                {products.map((item) => {
                    return <Card key={item.id} item={item.attributes} />
                })
                }
            </div>
        </div>
    )
}

export default Cards



