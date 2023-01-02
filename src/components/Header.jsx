import React from 'react';
import '../App.css';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = ({ theme, setTheme }) => {
  return (   
      <header className={theme ? 'header dark' : 'header'}>
        <div className="header_container">
          <h1 className='header_title'>Where in the world?</h1>
            <button 
              className='theme_btn'
              onClick={() => setTheme(!theme)}
            >
              <span className='theme_icon'>{theme ? <DarkModeIcon/> : <DarkModeOutlinedIcon/> }</span>
              <span>Dark mode</span>
            </button>
        </div>
      </header>
  )
}

export default Header