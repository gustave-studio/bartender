import { BooleanLiteral } from "typescript";

type CheckBoxProps = {
  id: number;
  checked: boolean;
  handleChange(id: number, checked: boolean): void;
  value: string;
}

const CheckBox = (props: CheckBoxProps) => {
  // console.log('checked!!!!!!')
  // console.log(props.checked)
  // const checked = 
  return (
    <input
      id={`props.id`}
      type="checkbox"
      name="inputNames"
      checked={props.checked}
      onChange={() => props.handleChange(props.id, !props.checked)}
      value={props.value}
    />
  )
}

export default CheckBox;
