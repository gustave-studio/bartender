import CheckBox from './CheckBox'
import ReactLoading from 'react-loading';
import Genre from '../genre.js';
import { MutableRefObject } from 'react';

type CheckListElement = {
  id: number
  label: string
  checked: boolean
}

type SearchByLocationProps = {
  isSearchByLocation: boolean;
  checkLists: Array<CheckListElement>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  handleChange(id: number, checked: boolean): void;
  isFirstRef: MutableRefObject<boolean>;
  isAvailable: boolean;
  isSearching: boolean;
  getCurrentPosition(): void;
}

const SearchByLocation = function (props: SearchByLocationProps) {
  return (
    <>
      <div style={{ display: props.isSearchByLocation ? '' : 'none' }}>
      <br />
      <label>お店の種類:</label>
      <select onChange={event => props.setGenre(event.target.value)}>
        {Genre.OPTIONS.map((genre, key) => {
          return (<option value={genre.code} key={key} >{genre.name}</option>)
        })}
      </select>
      <br />
      <form>
        <label>お店の条件:</label>
        {props.checkLists.map((item, index: number) => {
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={item.id}
                value={item.label}
                handleChange={props.handleChange}
                checked={item.checked}
              />
              {item.label}
            </label>
          )
        })}
      </form>
       {/* <p>位置情報から探す</p> */}
          {!props.isFirstRef && !props.isAvailable && <p className="App-error-text">geolocation IS NOT available</p>}
          {props.isAvailable && (
            <div>
              <button onClick={() => props.getCurrentPosition()}>位置情報から探す</button>
              { props.isSearching ? <ReactLoading type="spin" /> : <span /> }
            </div>
          )}
      </div>
    </>
  );
};

export default SearchByLocation;
