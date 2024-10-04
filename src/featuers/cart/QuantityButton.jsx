import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrease, increase } from "./CartSlice";

function QuantityButton({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button type="round" onClick={() => dispatch(decrease(pizzaId))}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increase(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default QuantityButton;
