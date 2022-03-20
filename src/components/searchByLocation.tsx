import React, { MutableRefObject } from 'react';
import ReactLoading from 'react-loading';
import CheckBox from './CheckBox';
import Genre from '../genre';

type CheckListElement = {
  id: number
  label: string
  checked: boolean
}

type SearchByLocationProps = {
  isSearchByLocation: boolean;
  checkLists: Array<CheckListElement>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleChange(id: number, checked: boolean): void;
  isFirstRef: MutableRefObject<boolean>;
  isAvailable: boolean;
  isSearching: boolean;
  getCurrentPosition(): void;
}

const SearchByLocation = function (props: SearchByLocationProps) {
  const {
    isSearchByLocation,
    checkLists,
    setGenre,
    handleChange,
    isFirstRef,
    isAvailable,
    isSearching,
    getCurrentPosition,
  } = props;
  return (
    <div style={{ display: isSearchByLocation ? '' : 'none' }}>
      <br />
      <label htmlFor="genre">お店の種類:</label>
      <select id="genre" onChange={(event) => setGenre(event.target.value)}>
        {
          Genre.OPTIONS.map((genre) => (
            <option value={genre.code} key={genre.code}>{genre.name}</option>
          ))
        }
      </select>
      <br />
      <form>
        <label htmlFor="shop_conditions">お店の条件:</label>
        {checkLists.map((item) => (
          <label htmlFor={`id_${item.id}`} key={`key_${item.id}`}>
            <CheckBox
              id={item.id}
              value={item.label}
              handleChange={handleChange}
              checked={item.checked}
            />
            {item.label}
          </label>
        ))}
      </form>
      {/* <p>位置情報から探す</p> */}
      {!isFirstRef && !isAvailable && <p className="App-error-text">geolocation IS NOT available</p>}
      {isAvailable && (
      <div>
        <button type="submit" onClick={() => getCurrentPosition()}>位置情報から探す</button>
        { isSearching ? <ReactLoading type="spin" /> : <span /> }
      </div>
      )}
    </div>
  );
};

export default SearchByLocation;
