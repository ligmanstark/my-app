import { convertTime } from '../function/convertTime'
import * as S from '../styles/style'
import like from '../../img/icon/like.svg'
import note from '../../img/icon/note.svg'

const ItemContent = (props) => {
  const {
    id,
    name,
    author,
    album,
    duration_in_seconds,
    handleSelectSong = Function.prototype,
  } = props

  return (
    <S.PlaylistItem
      className="playlist__item"
      key={id}
      onClick={handleSelectSong}
    >
      <S.PlaylistTrack className="playlist__track track">
        <S.TrackTittle className="track__title">
          <S.TrackTittleImage className="track__title-image">
            <S.TrackTittleSVG
              src={note}
              className="track__title-svg"
              alt="music"
            ></S.TrackTittleSVG>
          </S.TrackTittleImage>
          <div className="track__title-text">
            <S.TrackTittleLink className="track__title-link">
              {name}
            </S.TrackTittleLink>
          </div>
        </S.TrackTittle>
        <S.TackAuthor className="track__author">
          <S.TackAuthorLink className="track__author-link">
            {author}
          </S.TackAuthorLink>
        </S.TackAuthor>
        <S.TrackAlbum className="track__album">
          <S.TrackAlbumLink className="track__album-link">
            {album}
          </S.TrackAlbumLink>
        </S.TrackAlbum>
        <div className="track__time">
          <S.TrackTimeSVG
            src={like}
            className="track__time-svg"
            alt="time"
          ></S.TrackTimeSVG>
          <S.TrackTimeText className="track__time-text">
            {convertTime(duration_in_seconds)}
          </S.TrackTimeText>
        </div>
      </S.PlaylistTrack>
    </S.PlaylistItem>
  )
}
export { ItemContent }