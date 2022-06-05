import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { GravityContext } from '../context/GravityContext'
import Transaction from '../components/Transaction'

const History = () => {

    const styles = {
        container: `h-full w-full flex bg-[#fff]`,
        main: `w-full h-full flex flex-col mt-[50px]`,
        tableContainer: `w-full h-full flex flex-col justify-center`,
        transactions: `flex gap-[50px] flex-row flex-wrap`,
        title: `text-lg font-bold text-left mt-[50px] mb-[30px]`,
    }

    const { ownedItems } = useContext(GravityContext)

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.main}>
                <Header />
                <div className={styles.tableContainer}>
                    {ownedItems ? (
                        <div className={styles.title}>
                            Purchase History
                        </div>
                    ) : (
                        <div className={styles.title}>No Purchase History</div>
                    )}
                    <div className={styles.transactions}>
                        {ownedItems && (ownedItems.map((item, index) => {
                            return <Transaction key={index} item={item} />
                        }))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History