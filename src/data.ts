export const ItemTypes = ['item' as const];
export type ItemType = (typeof ItemTypes)[number];
export const GroupTypes = ['todo', 'doing', 'done'] as const;
export type GroupType = (typeof GroupTypes)[number];
export type Contents = {
  title: string;
  memo?: string;
};
export type Item = {
  id: number;
  type: ItemType;
  group: GroupType;
  contents: Contents;
  index?: number;
};
export type MoveHandler = (dragIndex: number, targetIndex: number, groupType: GroupType) => void;
export const TitleMap = {
  todo: 'Todo',
  doing: 'Doing',
  done: 'Done',
} as const;

export const items: Item[] = [{
  id: 1,
  type: 'item',
  group: 'todo',
  contents: {
    title: 'Writing a Blog',
    memo: 'Writing about React-dnd in Advent Calender',
  },
}, {
  id: 2,
  type: 'item',
  group: 'todo',
  contents: {
    title: 'Create a example',
    memo: 'Prepare a sample app to explain about React-dnd in blog',
  },
}, {
  id: 3,
  type: 'item',
  group: 'todo',
  contents: {
    title: 'Going to buy coffee',
  },
}, {
  id: 4,
  type: 'item',
  group: 'todo',
  contents: {
    title: 'Enjoy the holidays',
    memo: 'Want to relax',
  },
}, {
  id: 5,
  type: 'item',
  group: 'doing',
  contents: {
    title: 'Reading Manga',
    memo: 'Want to read Demon Slayer',
  },
}];
