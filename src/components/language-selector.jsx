import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';



const languages = [
    {code: "en", lang: "English"},
    {code: "he", lang: "עברית"}
]


export const LanguageSelector = () => {
 
      const {i18n} = useContext(ShopContext);
  
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.code);
    if(lng.code === "he"){
      toast.success("השפה השתנתה ל " + lng.lang);
    }else{
      toast.success("Language changed to " + lng.lang);
    }

  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  },[i18n, i18n.language])


  return (
    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
{
  languages.map((lng) => {
    return <div key={lng.code} className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
    <p onClick={()=> changeLanguage(lng)} className='cursor-pointer hover:text-black'>{lng.lang}</p>
</div>
  })
}
</div>
  )
}
