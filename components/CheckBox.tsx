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
export default function CheckBox({ prefectureName, onChange }: { prefectureName: string, onChange: (checked: boolean) => void }) {
    return (
      <div className="CheckBox">
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)} />
        {prefectureName}
      </div>
    );
  }
  