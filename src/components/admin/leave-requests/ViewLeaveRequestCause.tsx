import React from "react";
import Modal from "../../Modal";

export default function ViewLeaveRequestCause({
  show,
  hide,
  toview,
}: {
  show: boolean;
  hide: () => void;
  toview: any;
}) {
  return (
    <Modal show={show} hide={hide} title="Cause du demande de congé">
      {toview.description}
    </Modal>
  );
}
