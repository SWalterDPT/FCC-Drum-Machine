import { ChangeEvent } from "react";

interface SwitchProps {
  name: string;
  handleSwitch: (event: ChangeEvent<HTMLInputElement>) => void;
  selection: boolean;
  title: string;
}

export default function Switch(props: SwitchProps) {
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleSwitch(event);
  };

  return (
    <div className="switch-container">
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input switch-input-btn"
          id={props.name}
          defaultChecked={props.selection}
          onChange={handleSwitchChange}
        />
        <label className="custom-control-label" htmlFor={props.name}>
          {props.title}
        </label>
      </div>
    </div>
  );
}
