import { useSelector } from "react-redux";
import { formatCurrency } from "../../utillties/helpers";
import DeleteButton from "./DeleteButton";
import QuantityButton from "./QuantityButton";
import { getCurrentQuantity } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity} &times; {name}
      </p>
      <div className="flex items-center justify-between space-x-5">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <QuantityButton pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteButton id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
