import * as React from 'react';
import cn from 'classnames';
import classes from './index.module.css';
import SvgIcon from '../SvgIcon';
import { forwardRef } from 'react';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';

type BaseProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
  FormHelperTextProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseProps;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  BaseProps & {
    multiline?: boolean;
  };

type RefType = HTMLInputElement & HTMLTextAreaElement;

const TextField = forwardRef<RefType, InputProps & TextAreaProps>((props, ref) => {
  const {
    label,
    error = false,
    helperText,
    value,
    FormHelperTextProps,
    id,
    type = 'text',
    multiline = false,
    ...attrs
  } = props;

  const [typeInput, setTypeInput] = React.useState<React.HTMLInputTypeAttribute>(type);

  const inputClassNames = cn(classes.baseInput, {
    [classes.baseInputError]: error,
    [classes.inputContainer]: props.type === 'file',
    [classes.multilined]: multiline,
  });

  const fileRef = React.useRef<any>(null);

  const removeFile = function (event: any) {
    event.preventDefault();
    fileRef.current.value = null;
    attrs.onChange &&
      attrs.onChange({ target: { value: '' } } as React.ChangeEvent<
        HTMLInputElement & HTMLTextAreaElement
      >);
  };

  const handleClickButton = () => {
    fileRef.current.click();
  };

  const togglePassword = () => {
    if (typeInput === 'password') {
      setTypeInput('text');
    } else {
      setTypeInput('password');
    }
  };

  return (
    <div
      className={cn(classes.baseLabel, {
        [classes.baseLabelError]: error,
        [classes.disabledLabel]: props.disabled,
      })}
    >
      {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
      {props.type === 'file' ? (
        <div className={inputClassNames} onClick={handleClickButton}>
          <input {...attrs} className={classes.fileInput} id={id} ref={fileRef} type={props.type} />

          <div className={classes.nameContainer}>
            {value ? (
              <>
                <span className={classes.fileName}>{value}</span>
                <div className={classes.fileIcon} onClick={(event) => removeFile(event)}>
                  <SvgIcon size={24} icon="cancel" />
                </div>
              </>
            ) : (
              props.placeholder
            )}
          </div>
          <div className={classes.uploadButton}>upload</div>
        </div>
      ) : (
        <div className={classes.wrapperInput}>
          {props.multiline && (
            <textarea {...attrs} className={inputClassNames} id={id} ref={ref} value={value} />
          )}
          {!props.multiline && (
            <input
              {...attrs}
              value={value}
              className={inputClassNames}
              id={id}
              type={typeInput}
              ref={ref}
            />
          )}
          {props.type === 'password' && (
            <div className={classes.passwordIcon} onClick={togglePassword}>
              <SvgIcon size={24} icon={`${typeInput === 'password' ? 'eye-slash' : 'eye'}`} />
            </div>
          )}
        </div>
      )}

      {helperText && (
        <FormHelperText error={error} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
export default TextField;
