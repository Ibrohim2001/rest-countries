import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const Details = () => {

  const countryId = useParams();
  const url = 'https://restcountries.com/v3.1';
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${url}/name/${countryId.id}`);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [countryId.id]);

  return (
    <section className='single_page'>
      <div className="single_page_top">
        <Link to='/' className='btn'>
          <span className="arrow_left"><KeyboardBackspaceIcon/></span>
          <span>Back</span>
        </Link>
      </div>
      {
          data?.map((country, index) => (
            <div className="single_page_content" key={index}>
                <div className="left">
                  <img src={country.flags.png} alt="" />
                </div>
                <div className="right">
                  <h1 className="country_name">{country?.name?.common}</h1>
                  <div className="single_page_info">
                    <div className="info_left">
                      <p className="extra_details">
                        <span className="text_dark">Native Name:</span>
                        <span className="text_light">{country?.name?.common}</span>
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Population:</span>
                        <span className="text_light">{country?.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Region:</span>
                        <span className="text_light">{country?.region}</span>
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Sub Region:</span>
                        <span className="text_light">{country?.subregion}</span>
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Capital:</span>
                        <span className="text_light">{country?.capital ? country?.capital[0] : country?.capital}</span>
                      </p>
                    </div>
                    <div className="info_right">
                      <p className="extra_details">
                        <span className="text_dark">Top Level Domain:</span>
                        <span className="text_light">{country?.tld}</span>
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Currencies:</span>
                        {/* <span className="text_light">{country?.currencies[0].name}</span> */}
                        {/* {
                          country.currencies.map((currency, index) => (
                            <span>{currency}</span>
                          ))
                        } */}
                      </p>
                      <p className="extra_details">
                        <span className="text_dark">Languages:</span>
                        <span className="text_light">{country?.languages[0]}</span>
                      </p>
                    </div>
                  </div>
                  <div className="border">
                    <h3 className="subtitle">Border Countries:</h3>
                    <div className="border_list">
                      {
                        country.borders 
                        ? 
                        country.borders.map((item,index) => (
                          <Link to={`/`} key={index} className='border_item'>{item.slice(0, 1)+item.slice(1, item.length).toLowerCase()}</Link>
                        ))
                        :
                        <span className='no_borders'>No bordering countries</span>
                      }
                    </div>
                  </div>
                </div>
            </div>
          ))
        }
      
    </section>
  )
}

export default Details