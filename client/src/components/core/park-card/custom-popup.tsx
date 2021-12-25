import './custom-popup.scss';
import ParkCard from './park-card';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const CustomPopup = ({
  onClose,
  showing,
  parkId,
}: {
  onClose: any;
  showing: boolean;
  parkId: string;
}) => {
  console.log(parkId);
  const parkList = useSelector((state: any) => state.dogspots.dogspots);
  const user = useSelector((state: any) => state.user.user);
  const [show, setShow] = useState(false);
  const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
    setShow(false);
    onClose(false);
  };
  // function return true if string is in array
  function isInArray(value: string, array: string[]): boolean {
    return array.indexOf(value) > -1;
  }
  // function average of array of nums rounded up to nearest int
  function average(nums: number[]): number {
    return Math.ceil(nums.reduce((a, b) => a + b, 0) / nums.length);
  }
  useEffect(() => {
    setShow(showing);
  }, [showing]);
  const park: any = parkList.find((item: any) => item._id === parkId);
  const {
    selectedFile,
    name,
    mapDirections,
    rating,
    _id,
  }: {
    selectedFile: string;
    name: string;
    mapDirections: string;
    rating: number[];
    _id: string;
  } = park;

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className="overlay"
    >
      <div className="popup">
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div className="content">
          <ParkCard
            selectedFile={selectedFile}
            name={name}
            mapDirections={mapDirections}
            isFav={isInArray(_id, user.favorites)}
            rating={average(rating)}
            id={_id}
            key={_id}
          />
        </div>
      </div>
    </div>
  );
};
export default CustomPopup;
