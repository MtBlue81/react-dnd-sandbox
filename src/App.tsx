import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


type ItemType = {
  id: number;
  type: 'current' | 'past' | 'sep';
  text: string;
  height: number;
  index?: number;
};

const data: ItemType[] = [{
  id: 1,
  type: 'current',
  text: 'Number1',
  height: 50,
}, {
  id: 2,
  type: 'current',
  text: 'Number2',
  height: 80,
}, {
  id: 3,
  type: 'current',
  text: 'Number3',
  height: 50,
}, {
  id: NaN,
  type: 'sep',
  text: '------ LINE ------',
  height: 30,
}, {
  id: 4,
  type: 'past',
  text: 'Number4',
  height: 60,
}, {
  id: 5,
  type: 'past',
  text: 'Number5',
  height: 50,
}];

const ITEM_TYPE = ['current', 'past', 'sep'];

const Item: React.FC<{ item: ItemType, index: number, onMove: Function, forbidDrag: boolean }> = ({
  item, index, onMove, forbidDrag
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: ItemType, monitor) {
      if (ref === null || ref.current === null || item.index === undefined) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;
      const hoverClientY = mousePosition.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { ...item, index },
    canDrag() {
      return item.type !== 'sep' && !forbidDrag;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    })
  })

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging && item.type !== 'sep' ? 0 : 1,
        height: item.height,
        cursor: forbidDrag ? 'not-allowed' : canDrag ? 'move' : 'default',
      }}
      className='item'
    >
      {item.text}
    </div>
  );
};

function App() {
  const [list, setList] = useState(data);
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const item = list[dragIndex];
    setList(prevState => {
        const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        return [...newItems];
    })
  }
  useEffect(() => {
    const sepIndex = list.findIndex(i => i.type === 'sep');
    const current = list.slice(0, sepIndex);
    const past = list.slice(sepIndex + 1);
    console.log('---------')
    console.log('current', current.map(c => c.id));
    console.log('past', past.map(p => p.id));
    console.log('---------')
  }, [list]);
  const sepIndex = list.findIndex(i => i.type === 'sep');
  return (
    <div className='App'>
      <DndProvider backend={HTML5Backend}>
        {list.map((item, index) => {
          const forbidDrag = index === 0 && sepIndex <= 1;
          return (
            <Item key={item.id} item={item} index={index} onMove={moveItem} forbidDrag={forbidDrag}/>
          );
        })}
      </DndProvider>
    </div>
  );
}

export default App;
