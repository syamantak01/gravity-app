import React, { useContext } from 'react'
import { GravityContext } from '../context/GravityContext'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

const Transaction = ({ item }) => {

    const styles = {
        container: ` w-[40%] flex flex-col rounded-lg shadow-lg`,
        top: `flex w-full h-[80px] bg-[#0A0A0A] p-[20px] pr-[80px] gap-[80px] border-2 rounded-t-lg`,
        topHeaderText: `h-full w-[100px] text-xs font-bold text-left text-[#fff] flex`,
        content: `flex flex-col w-full h-[400px] gap-[20px] p-[20px] flex-1`,
        date: `text-xl font-bold`,
        item: `flex flex-row gap-[20px] w-full`,
        nameContainer: `flex flex-col justify-end`,
        itemName: `text-mg font-bold flex ml-[10px]`,
        etherscanBtn: `font-bold rounded-full h-[40px] w-[150px] cursor-pointer text-center border-2 border-[#0A0A0A] text-[#0A0A0A] bg-[#D3D3D3] flex justify-center items-center`,
    }

    const { username } = useContext(GravityContext)

    console.log(item)

    return (
        <>
            {item.map((product, index) => {
                return (
                    <div className={styles.container} key={index}>
                        <div className={styles.top}>
                            <div className='flex flex-row h-full w-[300px] gap-[50px]'>
                                <div className={styles.topHeaderText}>
                                    Bought on<br/>
                                    {moment(product.purchaseDate).format('DD/MM/YYYY')}
                                </div>
                                <div className={styles.topHeaderText}>
                                    PAID<br />
                                    {product.Price} GTC
                                </div>
                                <div className={styles.topHeaderText}>
                                    Owner<br />
                                    {username}
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.item}>
                                <Image
                                    className='object-cover'
                                    src={product.src}
                                    alt='item'
                                    height={100}
                                    width={100}
                                />
                                <div className={styles.nameContainer}>
                                    <div className={styles.itemName}>{product.Name}</div>
                                    <div className='flex flex-row items-center justify-center gap-4'>
                                        <Link href={`${product.etherscanLink}`}>
                                            <a target='_blank' rel='noopener'>
                                                <div className={styles.etherscanBtn}>Recipt</div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Transaction