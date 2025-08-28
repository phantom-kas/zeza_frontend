import React from "react";
import Compnent from './compnent'
type ListProps<T> = {
  items: T[];
  className?:string,
  is: React.ElementType
  renderItem: (item: T, index: number) => React.ReactNode;
};

function List<T>({ className ,items, renderItem, is ='div' }: ListProps<T>) {
  return (
    <Compnent as={is}  className={className}>
      {items.map((item, index) => (
        renderItem(item, index) 
      ))}
    </Compnent>
  );
}

export default List;