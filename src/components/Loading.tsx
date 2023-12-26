import React from "react";
import "./Loading.css";

export default function Loading({ isModal }: { isModal?: boolean }) {
  return (
    <div
      className={`flex justify-center ${
        isModal ? "h-[100px]" : "h-[calc(100vh-80px)]"
      } items-center`}
    >
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
