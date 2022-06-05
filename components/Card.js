import React, { useContext } from 'react'
import { GravityContext } from '../context/GravityContext'
import { SiBitcoinsv } from 'react-icons/si'
import Image from 'next/image'

const Card = ({ item }) => {

    const styles = {
        container: `flex flex-col`,
        card: `h-[270px] w-[260px] flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden`,
        title: `h-[70px] w-[260px] text-md flex flex-1 mt-[10px]`,
        price: `text-md flex`,
        coins: `mt-[1px] ml-[8px]`,
    }

    const { buyProduct } = useContext(GravityContext)

    return (
        <div
            className={styles.container}
            onClick={() => buyProduct(item, item.Price)}
        >
            <div className={styles.card}>
                <Image
                    src={item.src}
                    className='object-cover object-center'
                    width={260}
                    height={270}
                    alt="product"
                />
            </div>
            <div>
                <div className={styles.title}>
                    {item.Company} {item.Name} {item.Color}
                </div>
                <div className={styles.price}>
                    {item.Price} GTC <SiBitcoinsv size={20} className={styles.coins} />
                </div>
            </div>

        </div>
    )
}

export default Card