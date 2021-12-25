import './bark-parks.scss';
import ParkCard from '../core/park-card/park-card';
import { user } from './placeholder';
import { createDogSpot } from '../../actions/dogspots';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import DropdownMenu from '../core/dropdown-menu/dropdown-menu';
import { useDispatch } from 'react-redux';
const BarkParks = (): JSX.Element => {
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const dogSpots = useSelector((state: any) => state.dogspots.dogspots);
  console.log(useSelector((state: any) => state));
  const [parkList, setParkList] = useState(dogSpots);
  let user = useSelector((state: any) => state.user.user);
  if (userStorage === true) {
    if (userStorage.data.user._id && !user._id) {
      user = userStorage.data.user;
    }
  }
  const dispatch = useDispatch();
  let showingList = [
    'Everything',
    'Dog Parks',
    'Green Areas',
    'Nature Spots',
    'Walking Trails',
  ];
  if (user._id) {
    showingList = [
      'Everything',
      'Dog Parks',
      'Green Areas',
      'Nature Spots',
      'Walking Trails',
      'Favorites',
    ];
  }
  const sortByList = ['Rating', 'Name'];
  // function return true if string is in array
  function isInArray(value: string, array: string[]): boolean {
    return array?.indexOf(value) > -1;
  }
  // function average of array of nums rounded up to nearest int
  function average(nums: number[]): number {
    return Math.ceil(nums.reduce((a, b) => a + b, 0) / nums.length);
  }
  const initialState = {
    name: '',
    kind: '',
    selectedFile: '',
    mapDirections: '',
    userId: userStorage.data ? userStorage.data.user._id : '',
  };
  // edit map directions so spaces are turned into "+" and no tildes or ñ
  const [form, setForm] = useState(initialState);
  const handleChange = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const clear = () => {
    setForm({
      name: '',
      kind: '',
      selectedFile: '',
      mapDirections: '',
      userId: userStorage.data.user._id,
    });
  };
  const handleAddPark = (e: any) => {
    e.preventDefault();
    //function to turn spaces into "+"
    const mapDirections = form.mapDirections.split(' ').join('+');
    dispatch(createDogSpot(form, userStorage.data.token));
    console.log(form);
    setParkList([...parkList, form]);
    clear();
  };
  const [keyword, setKeyword] = useState('');
  const [byKindList, setByKindList] = useState('Everything');
  const [orderParams, setOrderParams] = useState('Rating');

  useEffect(() => {
    setParkList(
      parkList.filter((park: any) =>
        park.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);
  useEffect(() => {
    if (byKindList === 'Everything') {
      setParkList(dogSpots);
    } else if (byKindList === 'Dog Parks') {
      setParkList(dogSpots.filter((park: any) => park.kind === 'Dog Parks'));
    } else if (byKindList === 'Green Areas') {
      setParkList(dogSpots.filter((park: any) => park.kind === 'Green Areas'));
    } else if (byKindList === 'Nature Spots') {
      setParkList(dogSpots.filter((park: any) => park.kind === 'Nature Spots'));
    } else if (byKindList === 'Walking Trails') {
      setParkList(
        dogSpots.filter((park: any) => park.kind === 'Walking Trails')
      );
    } else if (byKindList === 'Favorites') {
      setParkList(
        dogSpots.filter((park: any) => user.favorites.includes(park._id))
      );
    }
  }, [byKindList]);
  useEffect(() => {
    if (orderParams === 'Name') {
      setParkList(
        parkList.sort((a: any, b: any) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        )
      );
    } else if (orderParams === 'Rating') {
      setParkList(
        parkList.sort((a: any, b: any) => (a.rating < b.rating ? -1 : 1))
      );
    }
  }, [orderParams]);

  return (
    <>
      <div className="parks__filter-options">
        <DropdownMenu
          title="Showing"
          itemList={showingList}
          filterFunc={setByKindList}
        />
        <DropdownMenu
          title="Sort by"
          itemList={sortByList}
          filterFunc={setOrderParams}
        />
      </div>
      <div className="parks-container">
        <input
          className="dogspot-searchbar"
          key="dogspot-searchbar"
          name="dogspot-searchbar"
          placeholder={'Search Dog Spot'}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {userStorage.data && (
          <form
            autoComplete="off"
            className="add-dogSpot__form"
            onSubmit={handleAddPark}
          >
            <div className="add-dogSpot__top">
              <button type="submit" className="adddogSpotBtn filter-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27.963 27.963"
                  width={80}
                  height={80}
                  xmlSpace="preserve"
                >
                  <path d="M13.98 0C6.259 0 0 6.26 0 13.982s6.259 13.981 13.98 13.981c7.725 0 13.983-6.26 13.983-13.981C27.963 6.26 21.705 0 13.98 0zm7.122 16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299h.001z" />
                </svg>
              </button>
              <h2 className="adddogSpotTitle">Add Dog Spot</h2>
            </div>
            <div className="add-dogSpot__bottom">
              <input
                type="text"
                name="name"
                id="add-dogSpot-name"
                className="add-dogSpot__input"
                placeholder={'Name'}
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="selectedFile"
                id="add-dogSpot-selectedFile"
                className="add-dogSpot__input"
                placeholder={'Picture'}
                value={form.selectedFile}
                onChange={handleChange}
              />
              <input
                type="text"
                name="mapDirections"
                id="add-dogSpot-mapDirections"
                className="add-dogSpot__input"
                placeholder={'Name and Location'}
                value={form.mapDirections}
                onChange={handleChange}
              />
              <select
                name="kind"
                id="add-dogSpot-kind"
                className="add-dogSpot__dropdown"
                value={form.kind}
                onChange={handleChange}
              >
                {showingList.slice(1, 5).map((item) => (
                  <option
                    value={item}
                    key={item}
                    className="dropdown-menu__item"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </form>
        )}

        {parkList &&
          parkList.map(
            ({
              selectedFile,
              name,
              mapDirections,
              rating = [0],
              _id = '1',
            }: {
              selectedFile: string;
              name: string;
              mapDirections: string;
              rating: number[];
              _id: string;
            }) => (
              <ParkCard
                selectedFile={selectedFile}
                name={name}
                mapDirections={mapDirections}
                isFav={isInArray(_id, user.favorites)}
                rating={average(rating)}
                id={_id}
                key={_id}
              />
            )
          )}
      </div>
    </>
  );
};
export default BarkParks;
