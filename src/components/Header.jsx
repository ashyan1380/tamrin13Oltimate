import React , { useState } from 'react'
import { FiMoon } from 'react-icons/fi';
import { FiSun } from 'react-icons/fi';

const Header = () => {
    const [theme, setTheme] = useState(false)
  const changeTheme = () => {
    const btnMoon = document.querySelector('.btn-moon')
    const header = document.querySelector('.header')
    const details = document.querySelectorAll('.details')

    btnMoon.addEventListener('click', () => {
        setTheme(!theme)

      document.body.classList.toggle('light-theme')
      header.classList.toggle('light-theme')

      details.forEach((detail) => {
        detail.classList.toggle('light-theme')
      })
    })
  }

  return (
    <>
      <header className="header">
        <div>
          <h1>Weather App</h1>
        </div>

        <div>
          <button className="btn-moon" onClick={() => changeTheme()}>
            <i className="fas fa-moon">{theme ? <FiMoon/> :<FiSun/> }</i>
          </button>
        </div>
      </header>
    </>
  )
}

export default Header