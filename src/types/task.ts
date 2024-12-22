export type Color =
  | 'white'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'teal'
  | 'pink';

export type Task = {
  id: number;
  title: string;
  color: Color;
  completed: boolean;
};
