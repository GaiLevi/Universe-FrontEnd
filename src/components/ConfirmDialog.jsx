import { Button } from "./common/Button";

export const ConfirmDialog = ({ isOpen, onCloseDialog, onOk, description }) => {
  function onClickOk() {
    onCloseDialog();
    onOk();
  }
  return isOpen ? (
    <section className="confirm-dialog">
      <div className="black-screen" onClick={onCloseDialog}></div>
      <div className="dialog-container">
        <p className="description">{description}</p>
        <div className="confirm-action-buttons">
          <Button label="Ok" onClick={onClickOk} />
          <Button label="Cancel" onClick={onCloseDialog} />
        </div>
      </div>
    </section>
  ) : (
    <span></span>
  );
};
