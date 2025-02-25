import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { LanguageSelector } from './language-selector';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const {t} = useTranslation();
    
    const {i18n,setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);
    // console.log(i18n)
    
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>{t('home')}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>{t('collection')}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>{t('about')}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>{t('contact')}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
            
      <div className='group relative'>
            <img src={assets.language} className='w-5 cursor-pointer' alt="" />
            <LanguageSelector/>
            </div>


            <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-black'>{t("my_profile")}</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>{t("orders")}</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>{t("logout")}</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link> 
            <img onClick={()=>setVisible(true)}  src={i18next.dir()==="rtl"?assets.menu_icon_rtl:assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> 
      </div>
        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 ${i18next.dir()==="rtl"? 'left-0' : 'right-0'} bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-2/3' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={i18next.dir()==="rtl"?assets.dropdown_icon_rtl:assets.dropdown_icon} alt="" />
                        <p>{t("back")}</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pr-6 pl-6 border' to='/'>{t('home')}</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pr-6 pl-6 border' to='/collection'>{t('collection')}</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pr-6 pl-6 border' to='/about'>{t('about')}</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pr-6 pl-6 border' to='/contact'>{t('contact')}</NavLink>
                </div>
        </div>

    </div>
  )
}

export default Navbar
