import { ActiveTrack } from '../../components/ActiveTrack'
import { useState, useRef, useEffect } from 'react'
import { ProgressBar } from '../../components/ProgressBar'
import { VolumeBar } from '../../components/VolumeBar'
import * as S from '../../components/styles/style'
import { useSelector, useDispatch } from 'react-redux'
import { shuffle, nextSong } from '../../../store/musicSlice'
import prevB from '../../../img/icon/prev.svg'
import nextB from '../../../img/icon/next.svg'
import playB from '../../../img/icon/play.svg'
import pauseB from '../../../img/icon/pause.svg'
import loopB from '../../../img/icon/loop.svg'
import repeatB from '../../../img/icon/repeat.svg'
import shuffleB from '../../../img/icon/shuffle.svg'
import volumeB from '../../../img/icon/volume.svg'
export let audioRef = ''
const PlayerBar = (props) => {
  const shuffleSong = useSelector(
    (state) => state.musicReducer.shuffleSongPlaylist
  )
  // const selectSong = useSelector(state=>state.musicReducer.selectSong)
  const dispatch = useDispatch()
  const shuffleMusic = () => {
    dispatch(shuffle(music))
  }

  const handleNextSong = () => {
    dispatch(nextSong({ music, selectSong }))
  }

  const { music = [], selectSong = [] } = props
  console.log(selectSong)
  audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const playingButton = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying((prev) => !prev)
    } else {
      audioRef.current.play()
      setIsPlaying((prev) => !prev)
    }
    console.log(isPlaying)
  }

  const handleLoop = () => {
    setIsLooping((prev) => !prev)
  }

  useEffect(() => {
    audioRef.current.play()
    setIsPlaying(true)
    return () => {
      setIsPlaying(false)
    }
  }, [selectSong[0].track_file])

  return (
    <S.Bar className="bar">
      <S.AudioStyle
        controls
        ref={audioRef}
        src={selectSong[0].track_file}
        loop={isLooping ? true : false}
      ></S.AudioStyle>
      <S.BarContent className="bar__content">
        <ProgressBar />
        <S.BarPlayerProgress className="bar__player-progress"></S.BarPlayerProgress>
        <S.BarPlayerBlock className="bar__player-block">
          <S.BarPlayer className="bar__player player">
            <S.PlayerControls className="player__controls">
              <S.PlayerPrev className="player__btn-prev">
                <S.PlayerPrevSVG
                  src={prevB}
                  className="player__btn-prev-svg"
                  alt="prev"
                  onClick={() => alert('Еще не реализовано')}
                ></S.PlayerPrevSVG>
              </S.PlayerPrev>
              <S.PlayerButtonPlay className="player__btn-play _btn">
                {!isPlaying ? (
                  <S.ButtonPlaySVG
                    src={playB}
                    className="player__btn-play-svg"
                    alt="play"
                    onClick={playingButton}
                  ></S.ButtonPlaySVG>
                ) : (
                  <S.ButtonPauseSVG
                    src={pauseB}
                    className="player__btn-play-svg"
                    alt="play"
                    onClick={playingButton}
                  ></S.ButtonPauseSVG>
                )}
              </S.PlayerButtonPlay>
              <S.PlayerButonNext className="player__btn-next">
                <S.PlayerButtonNextSVG
                  src={nextB}
                  className="player__btn-next-svg"
                  alt="next"
                  onClick={handleNextSong}
                ></S.PlayerButtonNextSVG>
              </S.PlayerButonNext>
              <S.PlayerButtonRepeat className="player__btn-repeat _btn-icon">
                {!isLooping ? (
                  <S.PlayerButtonRepeatSVG
                    src={repeatB}
                    className="player__btn-repeat-svg"
                    alt="repeat"
                    onClick={handleLoop}
                  ></S.PlayerButtonRepeatSVG>
                ) : (
                  <S.PlayerButtonRepeatSVG
                    src={loopB}
                    className="player__btn-repeat-svg"
                    alt="repeat"
                    onClick={handleLoop}
                  ></S.PlayerButtonRepeatSVG>
                )}
              </S.PlayerButtonRepeat>
              <S.PlayerButtonShuffle className="player__btn-shuffle _btn-icon">
                <S.PlayerButtonShuffleSVG
                  src={shuffleB}
                  className="player__btn-shuffle-svg"
                  alt="shuffle"
                  onClick={shuffleMusic}
                ></S.PlayerButtonShuffleSVG>
              </S.PlayerButtonShuffle>
            </S.PlayerControls>

            {!selectSong.length ? (
              ''
            ) : (
              <ActiveTrack
                key={selectSong[0].id}
                name={selectSong[0].name}
                author={selectSong[0].author}
                track_file={selectSong[0].track_file}
              />
            )}
          </S.BarPlayer>
          <S.BarVolumeBlock className="bar__volume-block volume">
            <S.VolumeContent className="volume__content">
              <S.VolumeImage className="volume__image">
                <S.VolumeSVG
                  src={volumeB}
                  className="volume__svg"
                  alt="volume"
                ></S.VolumeSVG>
              </S.VolumeImage>
              <S.VolumeProgress className="volume__progress _btn">
                <S.VolumeProgressLine>
                  <VolumeBar />
                </S.VolumeProgressLine>
              </S.VolumeProgress>
            </S.VolumeContent>
          </S.BarVolumeBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  )
}

export { PlayerBar }
