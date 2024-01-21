import React from "react";

export default function ErrorMsg({ message }: { message: string | undefined }) {
  return <div className="ErrorMsg">{message}</div>;
}
