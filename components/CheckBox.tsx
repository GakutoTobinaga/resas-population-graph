"use client"

type CheckBoxProps = {
  prefectureName: string;
  onChange: (checked: boolean) => void;
  disabled: boolean;
  checked: boolean;
};
export const CheckBox: React.FC<CheckBoxProps> = ({ prefectureName, onChange, disabled, checked }) => {
    const className = `CheckBox ${disabled ? 'Checkbox-disabled' : ''}`;
    return (
      <div className={className}>
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)} disabled={disabled} checked={checked} />
        {prefectureName}
      </div>
    );
  }
  