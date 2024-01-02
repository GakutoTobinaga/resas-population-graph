"use client"
export default function CheckBox({ prefectureName }: { prefectureName: string }) {
    return (
      <div className="CheckBox">
        <input type="checkbox" />
        {prefectureName}
      </div>
    )
  }
  