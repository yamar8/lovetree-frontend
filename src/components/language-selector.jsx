import React from 'react'
import { useTranslation } from 'react-i18next';

const languages = [
    {code: "en", lang: "English"},
    {code: "he", lang: "Hebrew"}
]


export const LanguageSelector = () => {
 
  const {i18n} = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
{
  languages.map((lng) => {
    return <div key={lng.code} className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
    <p onClick={()=> changeLanguage(lng.code)} className='cursor-pointer hover:text-black'>{lng.lang}</p>
</div>
  })
}
</div>
  )
}
