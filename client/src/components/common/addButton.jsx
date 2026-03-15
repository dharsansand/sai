import { Button } from "antd";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const AddButton = ({
  text,
  setOpen,
  antdBtn,
  loading,
  size,
  btnLink,
  color,
  onClick,
  htmlType,
  className
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
    if (setOpen) return setOpen();
  };

  if (antdBtn) {
    return (
      <Button
      
        type="primary"
        htmlType={htmlType || "button"}
        loading={loading}
        style={{ background: color }}
        onClick={handleClick}
        className={className}
      >
        {text}
      </Button>
    );
  }

  const ButtonContent = (
    <button
      className={`add__button ${className} 
      ${size === 2 ? "add__button2" : ""} 
      ${size === 3 ? "add__button3" : ""} 
      ${size === 4 ? "add__button4" : ""}`}
      onClick={handleClick}
    >
      <span className="add__button__text">{text}</span>

      <span className="add__button__icon">
        <LuPlus />
      </span>
    </button>
  );

  return btnLink ? <Link to={btnLink}>{ButtonContent}</Link> : ButtonContent;
};

export default AddButton;