import React, { useState } from 'react';
import { rateDogspot } from '../../../actions/dogspots';
import { useDispatch } from 'react-redux';
import Paw from '../paw/paw';
const StarRating = ({
  _rating,
  id,
}: {
  _rating: number;
  id: string;
}): JSX.Element => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(_rating);
  const [hover, setHover] = useState(0);
  const sendRating = (index: number) => {
    dispatch(rateDogspot({ dogspotId: id, rating: index }));
    setRating(index);
  };
  return (
    <div className="park-card__rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => sendRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <Paw
              filter={
                index <= (hover || rating) ? 'filter-green' : 'filter-dark'
              }
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
