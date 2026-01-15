import { Button } from "antd";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const AddButton = ({
  text,
  setOpen,
  antdBtn,
  loading,
  mb,
  mt,
  size,
  btnLink,
  color,
  onClick,
  htmlType,
}) => {
  return (
    <>
      {antdBtn ? (
        <Button
          htmlType={htmlType}
          loading={loading || null}
          className={`${
            color == "green" ? "form-chg-pw" : color == "red" ? "form-chg-red": "form-submit"
          } 
          ${mb} ${mt}`}

        >
          {text}
        </Button>
      ) : (
        <Link to={btnLink ? btnLink : null}>
          <button
            className={`add__button ${size == 2 && "add__button2"} ${
              size == 3 && "add__button3"
            }  ${size == 4 && "add__button4"}`}
            onClick={() => (setOpen ? setOpen((prev) => !prev) : null)}
          >
            <span className="add__button__text">{text}</span>
            <span className="add__button__icon">
              <LuPlus className="add__button__icon__1" />
            </span>
          </button>
        </Link>
      )}                  
    </>
  );
};

export default AddButton;
