import CheckBox from './CheckBox'
import ReactLoading from 'react-loading';
import Genre from '../genre.js';
import { MutableRefObject } from 'react';
import Prefectures from '../prefectures.js';

type CheckListElement = {
  id: number
  label: string
  checked: boolean
}

type SearchByStationProps = {
  isSearchByStation: boolean;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  station: string;
  setStation: React.Dispatch<React.SetStateAction<string>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  checkLists: Array<CheckListElement>;
  handleChange(id: number, checked: boolean): void;
  searchRestaurant(): void;
}

const searchByLocation = function (props: SearchByStationProps) {
  return (
    <>
      
      <div style={{ display: props.isSearchByStation ? '' : 'none' }}>
        <label>都道府県:</label>
        <select defaultValue={'東京都'} onChange={event => props.setPrefecture(event.target.value)}>
            {Prefectures.OPTIONS.map((option, key) => {
              // if (key === 12) {
              //   return (<option value={option} key={key} selected>{option}</option>) 
              // } else {
                return (<option value={option} key={key}>{option}</option>)
              // }
            })}
        </select>
        <br />
        <label>駅名:</label>
        <input
            type="text"
            value={props.station}
            onChange={event => props.setStation(event.target.value)}
        />
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
        <button onClick={() => props.searchRestaurant()}>検索</button>
      </div>
    </>
  );
};

export default searchByLocation;
