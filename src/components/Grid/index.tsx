import * as React from 'react';
import cn from 'classnames';
import classes from './index.module.css';

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface IContainerProps {
  type: 'container';
  children: React.ReactNode;
  className?: string;
  gap?: 1 | 2 | 3;
  marginTop?: number;
  marginBottom?: number;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

interface IItemProps {
  type: 'item';
  children: React.ReactNode;
  className?: string;
  xs?: Column;
  sm?: Column;
  md?: Column;
  lg?: Column;
}

const defaultGapSize = 8;

function Grid(props: IContainerProps | IItemProps) {
  if (props.type === 'container') {
    return (
      <div
        className={cn(classes.container, {
          [classes[`gap-${props.gap}`]]: !!props.gap,
          [props.className!]: !!props.className,
        })}
        style={{
          ...(props.marginTop && { marginTop: `${props.marginTop * defaultGapSize}px` }),
          ...(props.marginBottom && { marginBottom: `${props.marginBottom * defaultGapSize}px` }),
          ...(props.alignItems && { alignItems: props.alignItems }),
          ...(props.justifyContent && { justifyContent: props.justifyContent }),
        }}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className={cn(classes.item, {
        [props.className!]: !!props.className,
        [classes[`xs-${props.xs}`]]: !!props.xs,
        [classes[`sm-${props.sm}`]]: !!props.sm,
        [classes[`md-${props.md}`]]: !!props.md,
        [classes[`lg-${props.lg}`]]: !!props.lg,
      })}
    >
      {props.children}
    </div>
  );
}

export default Grid;
