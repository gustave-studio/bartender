import React from 'react';
import CheckBox from './CheckBox';
import Genre from '../genre';
import Prefectures from '../prefectures';

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
  // eslint-disable-next-line no-unused-vars
  handleChange(id: number, checked: boolean): void;
  searchRestaurant(): void;
}

const searchByLocation = function (props: SearchByStationProps) {
  return (
    <div style={{ display: props.isSearchByStation ? '' : 'none' }}>
      <label htmlFor="pref">都道府県:</label>
      <select id="pref" name="pref" defaultValue="東京都" onChange={(event) => props.setPrefecture(event.target.value)}>
        {
          Prefectures.OPTIONS.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))
        }
      </select>
      <br />
      <label htmlFor="station">駅名:</label>
      <input
        id="station"
        type="text"
        value={props.station}
        onChange={(event) => {
          props.setStation(event.target.value);
          event.currentTarget.blur();
        }}
      />
      <br />
      <label htmlFor="genre">お店の種類:</label>
      <select id="genre" onChange={(event) => props.setGenre(event.target.value)}>
        {
          Genre.OPTIONS.map((genre) => (
            <option value={genre.code} key={genre.code}>{genre.name}</option>
          ))
        }
      </select>
      <br />
      <form>
        <label htmlFor="shop_conditions">お店の条件:</label>
        {props.checkLists.map((item) => (
          <label htmlFor={`id_${item.id}`} key={`key_${item.id}`}>
            <CheckBox
              id={item.id}
              value={item.label}
              handleChange={props.handleChange}
              checked={item.checked}
            />
            {item.label}
          </label>
        ))}
      </form>
      <button type="submit" onClick={() => props.searchRestaurant()}>検索</button>
    </div>
  );
};

export default searchByLocation;
