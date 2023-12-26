import React from "react";

export default function ViewDateEvent({
  show,
  hide,
  toview,
}: {
  show: boolean;
  hide: () => void;
  toview: any;
}) {
  return <div onClick={hide}>{show ? "show" : "not show"}</div>;
}
