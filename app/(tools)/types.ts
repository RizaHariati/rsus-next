export type SubDataType = {
  name: string;
  title: string;
  link: string;
  type: string;
};
export type DataMenuType = {
  id: number;
  name: string;
  title: string;
  link: string;
  subdata: SubDataType[];
};

export type ArticleType = {
  id: string;
  date: Date | string;
  title: string;
  text: string[];
  newspaper: string;
  news_link: string;
  img: string;
  category: string;
  featured: boolean;
};
export type ColumnAssignmentType = {
  column1: boolean;
  column2: boolean;
  column3: boolean;
};
