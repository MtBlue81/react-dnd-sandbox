import React from 'react';
import { NoteIcon } from '@primer/octicons-react';

import './Item.css';
import type { Contents } from '../data';

const Item: React.FC<{
  id: number;
  contents: Contents
}> = ({ contents }) => (
  <div  className='item'>
    <NoteIcon className='icon'/>
    <div className='contents'>
      <p className='title'>{contents.title}</p>
      <p className='memo'>{contents.memo}</p>
    </div>
  </div>
);

export default Item;
