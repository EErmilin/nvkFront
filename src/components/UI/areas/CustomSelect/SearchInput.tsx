import React, { useState } from 'react';
import qs from 'qs';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import classes from './SearchInput.module.scss';
import './SearchInput.scss';
let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const Input: React.FC<{ placeholder: string}> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      className={classes.Input}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const SearchInput: React.FC = () => <Input placeholder="Поиск музыки"/>;

export default SearchInput;