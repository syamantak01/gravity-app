import React, { useContext } from 'react'
import { GravityContext } from '../context/GravityContext'
import { IoMdSearch } from 'react-icons/io'
import { RiHeartLine } from 'react-icons/ri'
import { CgShoppingBag } from 'react-icons/cg'
import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal'
import 'react-simple-hook-modal/dist/styles.css'
import BuyModal from './BuyModal'

const Header = () => {

    const styles = {
        container: `h-full  w-full flex items-center gap-5 px-16 mb-[50px]`,
        logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
        search: `p-[25px] mr-[30px] w-[400px] h-[30px] bg-[#F5F5F5] rounded-full shadow-lg flex flex items-center`,
        searchInput: `text-[20px] bg-transparent focus:outline-none border-none flex-1 items-center flex`,
        menu: `flex items-center gap-6`,
        menuItem: `flex items-center text-base font-bold cursor-pointer`,
        menuIcon: `mr-[10px]`,
        coins: `ml-[10px]`,
        balance: `w-[100px] flex items-center text-base font-bold cursor-pointer`
    }

    const { balance } = useContext(GravityContext)
    const { openModal, isModalOpen, closeModal } = useModal()


    return (
        <ModalProvider>
            <div className={styles.container}>
                <div className={styles.logo}>
                </div>
                <div className={styles.search}>
                    <input
                        type='text'
                        placeholder='Search'
                        className={styles.searchInput}
                    />
                    <IoMdSearch size={25} />
                </div>
                <div className={styles.menu}>
                    <div className={styles.menuItem}>
                        <RiHeartLine className={styles.menuIcon} size={25} />
                    </div>
                    <div className={styles.menuItem}>
                        <CgShoppingBag className={styles.menuIcon} size={25} />
                    </div>
                    {balance ? (
                        <div
                            className={styles.balance}
                            onClick={openModal}
                        >
                            {balance} GTC
                            <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
                                <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                                Buy with Ethereum
                            </button>
                            <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE} >
                                <BuyModal close={closeModal} />
                            </Modal>
                        </div>
                    ) : (
                        <div
                            className={styles.balance}
                            onClick={openModal}
                        >
                            0 GTC
                            <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
                                <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                                Buy with Ethereum
                            </button>
                            <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                                <BuyModal close={closeModal} />
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </ModalProvider>
    )
}

export default Header