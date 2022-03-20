import React from 'react';

type CheckBoxProps = {
  id: number;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange(id: number, checked: boolean): void;
  value: string;
}

function CheckBox(props: CheckBoxProps) {
  const {
    id, checked, handleChange, value,
  } = props;
  return (
    <input
      id="props.id"
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={() => handleChange(id, !checked)}
      value={value}
    />
  );
}

export default CheckBox;
