import classnames from "classnames";

import { generateBackgroundColorClass } from "../helpers";

const Dialog = ({ style, chatId, dialog, onSelectDialog }) => {
  const colorClass = generateBackgroundColorClass(dialog.title);

  return (
    <div
      style={style}
      className={classnames("dialog", { dialog_active: dialog._id === chatId })}
      onClick={() => onSelectDialog(dialog._id)}
    >
      <div className={classnames("dialog__ava", colorClass)} />
      <div>{dialog.title || "dialog title"}</div>
    </div>
  );
};

export default Dialog;
