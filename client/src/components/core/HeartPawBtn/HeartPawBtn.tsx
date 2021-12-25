import React from 'react';
import './HeartPawBtn.scss';

const HeartPawBtn = (): JSX.Element => {
  return (
    <button className="HeartPawBtn">
      <svg
        width={51.238}
        height={35.922}
        viewBox="0 0 13.557 9.504"
        xmlns="http://www.w3.org/2000/svg"
        className={`header-icon filter-white`}
      >
        <path
          d="M2.218 2.17c-.056.095-.313.413-.49.52-.179.11-.4.268-.362.632.037.364.41.52.656.505.246-.013.71-.059 1.04-.013.33.046.748.011.846-.337.098-.349-.12-.57-.292-.697-.17-.125-.455-.502-.543-.675-.088-.173-.535-.49-.855.065zM2.79.946c-.079.366.041.702.269.751.227.05.475-.208.554-.574.08-.366-.041-.703-.269-.752C3.117.322 2.87.58 2.79.946zm-.288 0c.08.365-.041.702-.269.751-.227.05-.475-.208-.554-.574-.08-.366.041-.703.269-.752.227-.05.475.208.554.574zm1.195.684c-.154.342-.107.696.105.792.212.095.509-.104.663-.446.154-.341.107-.696-.106-.791-.212-.096-.508.104-.662.445zm-2.096 0c.154.342.107.696-.105.792-.212.095-.509-.104-.663-.446-.154-.341-.107-.696.105-.791.212-.096.509.104.663.445zM3.903.013a1.386 1.386 0 00-1.257.794A1.386 1.386 0 000 1.402c0 1.455 2.646 3.374 2.646 3.374s2.646-1.919 2.646-3.374A1.39 1.39 0 003.902.013z"
          fillRule="evenodd"
        />
      </svg>
    </button>
  );
};
export default HeartPawBtn;