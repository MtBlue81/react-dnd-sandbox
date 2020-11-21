import React from 'react';
import { useDrop } from 'react-dnd';

import './Group.css';
import Item from './Item';
import Draggable from './Draggable';
import { Item as _Item, GroupType, ItemTypes, TitleMap, MoveHandler } from '../data';

const Group: React.FC<{
  items: _Item[];
  groupType: GroupType;
  firstIndex: number;
  onMove: MoveHandler;
}> = ({ items, groupType, firstIndex, onMove }) => {
  const [, ref] = useDrop({
    accept: ItemTypes,
    hover(dragItem: _Item) {
      const dragIndex = dragItem.index;
      if (dragIndex === undefined) return;
      if (dragItem.group === groupType) return;
      const targetIndex = dragIndex < firstIndex ?
        // forward
        firstIndex + items.length - 1 :
        // backward
        firstIndex + items.length;
      onMove(dragIndex, targetIndex, groupType);
      dragItem.index = targetIndex;
      dragItem.group = groupType;
    }
  });

  return (
    <div className={['group', groupType].join(' ')}>
      <h2><span className='count'>{items.length }</span>{TitleMap[groupType]}</h2>
      <ul className='list'>
        {items.map((item, i) => {
          return (
            <li key={item.id} className='item-wrapper'>
              <Draggable item={item} index={firstIndex + i} onMove={onMove}>
                <Item id={item.id} contents={item.contents} />
              </Draggable>
            </li>
          );
        })}
        <li className='last' ref={ref}/>
      </ul>
    </div>
  );
};

export default Group;
