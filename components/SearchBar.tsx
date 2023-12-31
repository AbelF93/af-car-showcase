"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

import SearchManufacturer  from "./SearchManufacturer";
import { useSearchParams } from "next/navigation";

const SearchButton = ({additionnalClasses} : {additionnalClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${additionnalClasses}`}>

    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={45}
      height={45}
      className="object-contain bg-blue-500 rounded-lg"
    />

  </button>
)

const SearchBar = () => {
    const[manufacturer, setManufacturer ] = useState(''); //! Listen Change on Manufacturer
    const [model, setModel] = useState(''); //! Listen Change on Model
    const router = useRouter (); //declare a Router

 
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 

      if(manufacturer === '' && model === ''){
        return alert('You need to fill the search bar')
      }

      updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase()//calling search Params
      )
    }
  

    const updateSearchParams= (model: string, manufacturer:string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (model) {
        searchParams.set('model',model)
      } else {
        searchParams.delete('model')
      }
      
      if (manufacturer) {
        searchParams.set('manufacturer',manufacturer)
      } else {
        searchParams.delete('manufacturer')
      }

    const newPathName = `${window.location.pathname}?
    ${searchParams.toString()}`
  
    router.push(newPathName, { scroll: false }) //Push the modified Path into the url, prevent scrolling reset
  }

    return (
    <form className="searchbar" onSubmit=
    {handleSearch}>
        <div className="searchbar__item">
           <SearchManufacturer 
           manufacturer={manufacturer}
           setManufacturer={setManufacturer}
           />
        </div>
        <div className="searchbar_item bg-blue-800 rounded-e-md">
            <Image 
              src="/model-icon.png"
              alt="car model"
              width={50}
              height={50}
              className="absolute max-sm:top-[75px]  top-2 w-[30px] h-[30px] ml-2"
            />
           
            <input type="text" 
            name="model" 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            placeholder="Q3"
            className="search-manufacturer__input text-white"
            />
           
    
        </div>
        <SearchButton additionnalClasses="sm:hidden px-5"/>
        <SearchButton additionnalClasses="max-sm:hidden px-5"/>
    </form>
  )
}

export default SearchBar