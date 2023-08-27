import Navigation from './layout/layout-content/Navigation'
import MiddleContent from './layout/layout-content/MiddleContent'
import Sidebar from './layout/layout-content/Sidebar'
import React, { useEffect, useState } from 'react'
import { getAllTracks, getTrackById } from './function/response'
import { PlayerBar } from './layout/layout-content/PlayBar'
import { PreloaderSideBar } from './components/PreloaderSideBar'
import * as S from './styles/style'

function Content() {
  const [music, setMusic] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [isOpenFilter, setOpenFilter] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [filteredMusic, setFilteredMusic] = useState([])
  const [lengthFilter, setLengthFilter] = useState(null)

  const handleOpenFilter = (event) => {
    setOpenFilter(true)
    const value = event.target.innerHTML
    if (value === 'исполнителю') {
      setFilteredMusic([...new Set(music.map((e) => e.author))])
      setLengthFilter([...new Set(music.map((e) => e.author))].length)
      setNameFilter('исполнителю')
    } else if (value === 'году выпуска') {
      const arr = [...new Set(music.map((e) => e.release_date))]
        .filter((word) => word !== null)
        .map((e) => e.slice(0, 4))
      setFilteredMusic(arr)
      setLengthFilter(arr.length)
      setNameFilter('году выпуска')
    } else if (value === 'жанру') {
      setFilteredMusic([...new Set(music.map((e) => e.genre))])
      setLengthFilter([...new Set(music.map((e) => e.genre))].length)
      setNameFilter('жанру')
    }
    if (nameFilter === value) {
      setOpenFilter(false)
      setLengthFilter(null)
      setNameFilter('')
    }
  }

  useEffect(() => {
    getAllTracks().then((data) => {
      setMusic(data.data)
      setFilteredMusic([...new Set(data.data.map((e) => e.author))])
    })
  }, [])

  const searchTrack = (id) => {
    getTrackById(id).then((data) => {
      const flat = [data.data].flat(1)
      setMusic(flat)
    })
  }

  const handleChangeMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <S.Wrapper className="wrapper">
      <S.Container className="container">
        <S.Main className="main">
          <Navigation handleChangeMenu={handleChangeMenu} isOpen={isOpen} />
          <MiddleContent
            music={music}
            searchTrack={searchTrack}
            handleOpenFilter={handleOpenFilter}
            isOpenFilter={isOpenFilter}
            filteredMusic={filteredMusic}
            nameFilter={nameFilter}
            lengthFilter={lengthFilter}
          />
          {!music.length ? <PreloaderSideBar /> : <Sidebar />}
        </S.Main>
        <PlayerBar music={music} />
        <footer className="footer"></footer>
      </S.Container>
    </S.Wrapper>
  )
}

export { Content }