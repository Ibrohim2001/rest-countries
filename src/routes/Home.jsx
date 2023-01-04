import React, { useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = ({ theme }) => {

  const regions = ["africa", "america", "asia", "europe", "oceania"];

  const [showFilters, setShowFilters] = useState(false);
  const [region, setRegion] = useState("all");
  const url = 'https://restcountries.com/v3.1'; 
  const [searchCountry, setSearchCountry] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${url}/all`);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [url]);

  const handleDisplayFilters = () => {
    setShowFilters(!showFilters);
  }

  const getByRegion = async (region) => {
    try {
      const res = region === "all" ? await axios.get(`${url}/${region}`) : await axios.get(`${url}/region/${region}`);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearchCountry(e.target.value);
  }

  return (    
      <div className='home'>
        <div className="home_options">
            <div className={theme ? "searchbar dark" : "searchbar"}>
              <span className="search_icon"><SearchOutlinedIcon/></span>
              <input 
                type="text"
                placeholder='Search for a country...' 
                className='search_input'
                value={searchCountry}
                onChange={handleSearch}
              /> 
            </div>
            <div 
              className={theme ? "filter_container dark" : "filter_container"} 
              onClick={handleDisplayFilters}
            >
              <div className="filter">
                <span className='filter_title'>Filter by {region === "" ? "All" : region}</span>
                <span className='arrow_icon'>
                  <KeyboardArrowDownOutlinedIcon style={showFilters ? {transform: "rotate(180deg)"} : {transform: "rotate(0deg)"}}/>
                </span>
              </div>
              <ul className={showFilters ? "filters display" : "filters"}>
                {regions.map((item, index) => (
                  <li
                      key={index} 
                      onClick={() => {
                      getByRegion(item);
                      setRegion(item)
                    }}
                  >
                    {item.slice(0, 1).toUpperCase()+item.slice(1, item.length)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card_container">
           {
            data?.filter((item) => {
              return searchCountry.toLowerCase() === '' 
              ? item
              : item.name.common.toLowerCase().includes(searchCountry)
            }).map((country, index) => (
              <Link to={`/country/${country.name.common.replace(/ /g, '-')}`} className="card" key={index}>
                <div className="flag_img">
                  <img src={country.flags?.png} alt="" />    
                </div>
                <div className="card_info">
                  <h2 className="country_name">{country?.name?.common}</h2>
                  <p className="extra_details">
                    <span className="text_dark">Population:</span>
                    <span className="text_light">{country?.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </p>
                  <p className="extra_details">
                    <span className="text_dark">Regions:</span>
                    <span className="text_light">{country?.region}</span>
                  </p>
                  <p className="extra_details">
                    <span className="text_dark">Capital:</span>
                    <span className="text_light">{country?.capital ? country?.capital[0] : country?.capital}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        
      </div>
  )
}

export default Home