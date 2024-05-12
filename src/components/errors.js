import { IconContext } from "react-icons";
import { ImNotification } from "react-icons/im";
const Errs = ({err}) => (
  <p className="notification">
    {err}{" "}
    <IconContext.Provider value={{ className: "icon_ImNotification" }}>
      <ImNotification />
    </IconContext.Provider>
  </p>
);

export default Errs;
