import { formatCurrency } from "../../utillties/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      {isLoadingIngredients ? (
        <p className="text-sm font-semibold capitalize text-slate-500">
          Loading...
        </p>
      ) : (
        <p className="text-sm font-semibold capitalize text-slate-500">
          {ingredients.join(", ")}
        </p>
      )}
    </li>
  );
}

export default OrderItem;
