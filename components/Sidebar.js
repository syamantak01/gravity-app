//use `rafce` for the template code snippet

import React, { useContext } from 'react'
import { ConnectButton } from 'web3uikit'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../products/gravity-logo.png'
import { GravityContext } from '../context/GravityContext'
import { AiFillHome } from 'react-icons/ai'
import { AiOutlineHistory } from 'react-icons/ai'


const Sidebar = () => {
    const styles = {
        container: `w-[500px] h-[1000px] mr-[100px] flex flex-col bg-[#fff] static`,
        logoContainer: `h-[50px] w-[350px] absolute inset-x-0 top-0 ml-[50px] mt-[20px]`,
        profile: ` w-full py-16 flex flex-col justify-center items-center mt-[20px] mb-[20px]`,
        profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5 mt-5`,
        profilePic: `rounded-3xl object-cover`,
        welcome: ` text-md mb-2 font-bold text-xl`,
        menu: `flex flex-col w-full h-full px-10 gap-10`,
        menuItem: `flex items-center text-base font-bold cursor-pointer gap-2`,
        gravityLogo: `mr-4 flex object-cover`,
        usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
        username: `flex items-center w-full justify-center`,
        setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
        recentTitle: `text-xl font-bold text-center mb-[10px] text-center mt-[40px]`,
        recentTransactionList: `flex flex-col`,
        transactionCard: `flex flex-col mb-[20px] ml-[20px] p-[30px] bg-[#232023] text-white rounded-xl shadow-xl gap-[20px] text-xs`,
    }
    const {
        isAuthenticated,
        nickname,
        setNickname,
        username,
        handleSetUsername,
        recentTransactions
    } = useContext(GravityContext)

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Image
                    src={logo}
                    height={80}
                    width={400}
                    className={styles.gravityLogo}
                />
            </div>
            <div className={styles.profile}>
                {
                    isAuthenticated && (
                        <>
                            <div className={styles.profilePicContainer}>
                                <Image
                                    src='/profile-photo.svg'
                                    alt='profile'
                                    className={styles.profilePic}
                                    height={80}
                                    width={80}
                                />
                            </div>
                            {!username ? (
                                <>
                                    <div className={styles.username}>
                                        <input
                                            type='text'
                                            placeholder='Username...'
                                            className={styles.usernameInput}
                                            value={nickname}
                                            onChange={e => setNickname(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={styles.setNickname}
                                        onClick={handleSetUsername}
                                    >
                                        Set Nickname
                                    </button>
                                </>
                            ) : (
                                <div>
                                    <div className={styles.welcome}> Hello, {username}</div>
                                </div>
                            )}
                        </>
                    )
                }
                <div className={styles.connectButton}>
                    <ConnectButton />
                </div>
            </div>
            <div className={styles.menu}>
                <Link href='/'>
                    <div className={styles.menuItem}>
                        <AiFillHome />
                        Home
                    </div>
                </Link>
                <Link href='/History'>
                    <div className={styles.menuItem}>
                        <AiOutlineHistory />
                        Transaction History
                    </div>
                </Link>
            </div>
            {recentTransactions.length > 0 && (
                <h1 className={styles.recentTitle}>Recent Transaction</h1>
            )}
            {recentTransactions &&
                recentTransactions.map((transaction, index) => {
                    console.log(transaction)
                    return (
                        <div key={index} className={styles.recentTransactionList}>
                            <div className={styles.transactionCard}>
                                <div><b>From</b>:   {transaction.attributes.from_address}</div>
                                <div><b>To</b>:   {transaction.attributes.to_address} </div>
                                <div>
                                    <b>Hash</b>:    {' '}
                                    <a
                                        target={'_blank'}
                                        rel='noopener noreferrer'
                                        href={`https://rinkeby.etherscan.io/tx/${transaction.attributes.hash}`}
                                    >
                                        {transaction.attributes.hash.slice(0, 10)}
                                    </a>
                                </div>
                                <div><b>Gas</b>:   {transaction.attributes.gas}</div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Sidebar