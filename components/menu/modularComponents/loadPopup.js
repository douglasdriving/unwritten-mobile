import { Popup } from '../../smart/popup.js';

export const LoadPopup = (props) => {
  return (
    <>
      {props.isLoading &&
        <Popup title={props.loadText} loading={true} />
      }
    </>
  );
}