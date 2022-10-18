import React, { useState, useRef, useEffect, forwardRef } from 'react';
import cn from 'classnames';
import classes from './index.module.css';
import SvgIcon from '../SvgIcon';
import InputLabel from '../InputLabel';
import FormHelperText from '../FormHelperText';

interface IOption {
  value: number | string;
  label: number | string;
}

interface IBaseProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  label?: string;
  error?: boolean;
  helperText?: string;
  FormHelperTextProps?: React.HTMLAttributes<HTMLDivElement>;
}

type RefType = HTMLInputElement;

const Select = forwardRef<RefType, IBaseProps>((props: IBaseProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(props.defaultValue || '');

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOptions = () => {
    if (props.disabled) {
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const handleChange = (value: IOption['value']) => {
    props.onChange && props.onChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>);
    setSelectValue(value);
    toggleOptions();
  };

  const findLabelByValue = (value: any) =>
    props.options.find((option) => option.value === value)?.label;

  const currentValue = findLabelByValue(props.value) || findLabelByValue(selectValue);

  return (
    <div
      ref={rootRef}
      className={cn({
        [classes.disabled]: props.disabled,
      })}
    >
      <InputLabel disabled={props.disabled}>{props.label}</InputLabel>

      <div className={cn(classes.select, { [classes.selectOpen]: isOpen })}>
        <div
          onClick={toggleOptions}
          className={cn(classes.head, {
            [classes.headOpen]: isOpen,
            [classes.headDisabled]: props.disabled,
            [classes.headError]: props.error,
          })}
        >
          <div
            className={cn(classes.value, {
              [classes.placeholder]: !currentValue,
            })}
          >
            {currentValue || props.placeholder}
          </div>
          <div className={classes.arrow}>
            <SvgIcon icon={isOpen ? 'arrow-up' : 'arrow-down'} />
          </div>
        </div>
        {isOpen && (
          <div className={cn(classes.body, { [classes.bodyOpen]: isOpen })}>
            {props.options.map((option) => (
              <div
                key={option.value}
                className={classes.option}
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <input type="hidden" value={props.value} ref={ref} />

      {props?.helperText && (
        <FormHelperText error={!!props?.error} {...props.FormHelperTextProps}>
          {props.helperText}
        </FormHelperText>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
