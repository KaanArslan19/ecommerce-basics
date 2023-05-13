import classes from "./PrimaryButton.module.css";
const PrimaryButton = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className ? className : classes.button}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
