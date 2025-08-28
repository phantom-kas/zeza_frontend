import React from "react";

type AsProp<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

 function Slot<T extends React.ElementType = "div">({
  as,
  children,
  ...props
}: AsProp<T>) {
  const Component = as || "div"; // default to <div>
  return <Component {...props}>{children}</Component>;
}

export default Slot;
