import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Item, GroupType, GroupTypes } from '../data';

type GroupedItems = {
  [k in GroupType]?: Item[]
};
type UseGroupedItems = (items: Item[]) => [GroupedItems, Item[], Dispatch<SetStateAction<Item[]>>];

const useGroupedItems: UseGroupedItems = (items) => {
  const [list, setList] = useState<Item[]>(items);
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});
  useEffect(() => {
    setGroupedItems(
      GroupTypes.reduce<GroupedItems>((acc, group) => {
        acc[group] = list.filter(v => v.group === group);
        return acc;
      }, {})
    );
  }, [list])
  return [groupedItems, list, setList];
};

export default useGroupedItems;
