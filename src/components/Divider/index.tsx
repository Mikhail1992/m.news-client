import classes from './index.module.css';

interface IProps {
  marginTop?: number;
  marginBottom?: number;
}

const defaultGapSize = 8;

function Divider({ marginTop = 4, marginBottom = 4 }: IProps) {
  return (
    <div
      className={classes.divider}
      style={{
        marginTop: `${marginTop * defaultGapSize}px`,
        marginBottom: `${marginBottom * defaultGapSize}px`,
      }}
    ></div>
  );
}

export default Divider;
