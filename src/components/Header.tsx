import React, { useCallback, ChangeEventHandler } from 'react';

import './Header.css';

const Header: React.FC<{
  isHorizontal: boolean;
  onChangeIsHorizontal: (isHorizontal: boolean) => void;
}> = ({ isHorizontal, onChangeIsHorizontal }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChangeIsHorizontal(e.target.checked);
  }, [onChangeIsHorizontal]);

  return (
    <header className='header'>
      <h1>かんばん(Sansanのカタチ) with React DnD</h1>
      <label className='checkbox'>
        <input type="checkbox" onChange={handleChange} checked={isHorizontal}/>
        Horizontal?
      </label>
    </header>
  );
}

export default React.memo(Header);
