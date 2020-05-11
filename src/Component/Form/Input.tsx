import React, { ChangeEvent, CSSProperties, InputHTMLAttributes, useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import { buildClassName } from '../../util/component';
import './Input.css';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type InputType = 'normal' | 'ghost';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  type?: InputType;
  onChangeDebounce?: (value: string) => void;
  changeDebounceTime?: number;
}

const ghostStyle: CSSProperties = {
  border: 'none'
};

export function Input(props: InputProps) {
  const { onChangeDebounce, changeDebounceTime } = props;
  const changeRef$ = useRef(new Subject<string>());

  const style: CSSProperties = {
    outline: 'none',
    fontSize: 'inherit',
    padding: '8px 8px',
    borderRadius: 6,
    border: '1px solid #e8e8e8',
    width: props.block ? '100%' : 'initial',
    boxSizing: 'border-box',
    ...(props.type === 'ghost' ? ghostStyle : {}),
    ...props.style
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeDebounce && changeRef$.current.next(event.target.value);
    props.onChange && props.onChange(event);
  };

  useEffect(() => {
    if (!onChangeDebounce) {
      return;
    }
    const subscriber = changeRef$.current.pipe(debounceTime(changeDebounceTime || 600)).subscribe((value: string) => {
      onChangeDebounce(value);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [onChangeDebounce, changeDebounceTime]);

  return (
    <input
      className={buildClassName(['AppInput', props.className])}
      style={style}
      onChange={onChange}
      {...omit(props, ['style', 'block', 'className', 'onChange', 'onChangeDebounce'])}
    />
  );
}
