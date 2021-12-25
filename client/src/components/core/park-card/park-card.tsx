import './park-card.scss';
import React from 'react';
import LikeParkBtn from '../LikeParkBtn/LikeParkBtn';
import StarRating from '../star-rating/star-rating';
import BarkBtn from '../BarkBtn/BarkBtn';

type ParkCardProps = {
  selectedFile: string;
  name: string;
  mapDirections: string;
  isFav: boolean;
  rating: number;
  id: string;
};
export default function ParkCard({
  selectedFile,
  name,
  mapDirections,
  isFav,
  rating,
  id,
}: ParkCardProps): JSX.Element {
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className="park-card">
      <div className="park-card__visual">
        <img className="park-card__pic" src={selectedFile} alt={name} />
        <iframe
          className="park-card__map"
          title={name}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD3Lf9t4QlTaLFZ8nJta1uB2MVm9b2KRfg&q=${mapDirections}`}
          width={100}
          height={100}
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="park-card__identity">
        <StarRating _rating={rating} id={id} />
        <div className="park-card__name">{name}</div>
      </div>
      {userStorage.data ? (
        <div className="park-card__notifications">
          <div className="park-card__fav">
            <LikeParkBtn isFav={isFav} dogspotId={id} />
            My FAV!
          </div>
          <div className="park-card__going">
            Going there!
            <BarkBtn id={id} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <button
        className="park-card__copyId"
        onClick={() => {
          navigator.clipboard.writeText(id);
        }}
      >
        Copy#ID
      </button>
    </div>
  );
}
