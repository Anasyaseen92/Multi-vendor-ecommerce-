import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {FiPackage, FiShoppingBag}  from "react-icons/fi"

function DashboardHeader() {
    const {seller} = useSelector((state) => state.seller)
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
        <div>
            <Link to="/dashboard">
            <img src='https://shopo.quomodothemes.website/assets/images/logo.svg'
            alt=''
            />
            </Link>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center mr-4'>
                <Link to="/dashboard/cupouns">
                <AiOutlineGift
                color='#555'
                size={30}
                className='mx-5 cursor-pointer'
                />
                </Link>

             <Link to="/dashboard-events">
                <MdOutlineLocalOffer
                color='#555'
                size={30}
                className='mx-5 cursor-pointer'
                />
            </Link>

             <Link to="/dashboard-products">
                <FiShoppingBag
                color='#555'
                size={30}
                className='mx-5 cursor-pointer'
                />
            </Link>

             <Link to="/dashboard-orders">
                <FiPackage
                color='#555'
                size={30}
                className='mx-5 cursor-pointer'
                />
            </Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader