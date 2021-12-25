import React from 'react';
import './dropdown-menu.scss';
const DropdownMenu = ({
  title,
  itemList,
  filterFunc,
}: {
  title: string;
  itemList: string[];
  filterFunc: Function;
}): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterFunc(e.target.value);
  };
  return (
    <div className="dropdown-menu">
      <h2 className="dropdown-menu__title">{title}</h2>
      <select
        className="dropdown-menu__box"
        name={title}
        id={title}
        onChange={handleChange}
      >
        {itemList.map((item) => (
          <option value={item} key={item} className="dropdown-menu__item">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropdownMenu;
