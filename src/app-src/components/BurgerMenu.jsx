import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './styles/style'
import { usePostTokenMutation } from '../../store/service/serviceMusicApi'
const BurgerMenu = () => {
  const [postToken, {}] = usePostTokenMutation()

  const navigate = useNavigate()
  const handleLogout = () => {
    setTimeout(() => {
      navigate('/login')
      localStorage.setItem('user', '')
      localStorage.setItem('token', '')
    }, 500)
  }

  const handleBackToMainPage = () => {
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  const handleMyPlaylist = () => {
    setTimeout(() => {
      navigate('/favorites')
    }, 500)
  }
  return (
    <S.NavMenu className="nav__menu menu">
      <S.MenuList className="menu__list">
        <S.MenuItem className="menu__item">
          <S.MenuLink className="menu__link" onClick={handleBackToMainPage}>
            Главная
          </S.MenuLink>
        </S.MenuItem>
        <S.MenuItem className="menu__item">
          <S.MenuLink className="menu__link" onClick={handleMyPlaylist}>
            Мой плейлист
          </S.MenuLink>
        </S.MenuItem>
        <S.MenuItem className="menu__item">
          <S.MenuLink className="menu__link" onClick={handleLogout}>
            Выйти
          </S.MenuLink>
        </S.MenuItem>
      </S.MenuList>
    </S.NavMenu>
  )
}
export { BurgerMenu }
