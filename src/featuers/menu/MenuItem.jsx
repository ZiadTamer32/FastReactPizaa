import PropTypes from "prop-types";
import { formatCurrency } from "../../utillties/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantity } from "../cart/CartSlice";
import DeleteButton from "../cart/DeleteButton";
import QuantityButton from "../cart/QuantityButton";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(pizza.id));
  const isInCart = currentQuantity > 0;
  function handleAddItem() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={pizza.imageUrl}
        alt={pizza.name}
        className={`h-24 ${pizza.soldOut ? "grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{pizza.name}</p>
        <p className="text-sm capitalize italic text-slate-500">
          {pizza.ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-stone-600">
          {pizza.soldOut ? (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          ) : (
            <p>{formatCurrency(pizza.unitPrice)}</p>
          )}
          {isInCart && (
            <div className="flex gap-8">
              <QuantityButton
                pizzaId={pizza.id}
                currentQuantity={currentQuantity}
              />
              <DeleteButton id={pizza.id} />
            </div>
          )}
          {!pizza.soldOut && !isInCart && (
            <Button onClick={handleAddItem} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
