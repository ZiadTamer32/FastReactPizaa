import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TotalPrice, TotalQuantity } from "./CartSlice";

function CartOverview({ isFixed }) {
  const getTotalQuantity = useSelector(TotalQuantity);
  const getTotalPrice = useSelector(TotalPrice);
  if (!getTotalPrice) return null;

  return (
    <div
      className={`flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 ${
        isFixed ? "fixed bottom-0 left-0 right-0" : ""
      }`}
    >
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{getTotalQuantity} pizzas</span>
        <span>${getTotalPrice}.00</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
