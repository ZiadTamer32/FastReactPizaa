import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getItem } from "./CartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getItem);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-xl font-bold">Your cart , {username}</h2>
      <ul className="mt-4 divide-y-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-x-4">
        <Button to="/order/new" type="primary" className="space-x-3">
          Order pizzas
        </Button>
        <Button onClick={() => dispatch(clearItem())} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
