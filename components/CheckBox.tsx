"use client"
/*
export default function CheckBox({ prefectureName }: { prefectureName: string }) {
    return (
      <div className="CheckBox">
        <input type="checkbox" />
        {prefectureName}
      </div>
    )
  }
*/
type CheckBoxProps = {
  prefectureName: string;
  onChange: (checked: boolean) => void;
  disabled: boolean;
};
export const CheckBox: React.FC<CheckBoxProps> = ({ prefectureName, onChange, disabled }) => {
    return (
      <div className="CheckBox">
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
        {prefectureName}
      </div>
    );
  }
  