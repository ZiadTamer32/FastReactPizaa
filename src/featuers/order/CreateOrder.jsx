// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getItem, TotalPrice } from "../cart/CartSlice";
import { formatCurrency } from "../../utillties/helpers";
import { useState } from "react";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const { username, status, error, position, address } = useSelector(
    (state) => state.user,
  );
  const cart = useSelector(getItem);
  const totalPrice = useSelector(TotalPrice);
  const isPriority = withPriority
    ? Math.ceil(0.2 * totalPrice + totalPrice)
    : totalPrice;
  const isLoadingPosition = status === "loading";

  return (
    <div className="px-3 py-4">
      <h2 className="mb-6 font-bold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-3 sm:mb-0 sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-3 sm:mb-0 sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-4 rounded-lg bg-red-200 p-2 text-sm text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-3 sm:mb-0 sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingPosition}
              required
            />
            {status === "error" && (
              <p className="mt-4 rounded-xl bg-red-200 p-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[39px] sm:top-[3px]">
                <Button
                  disabled={isLoadingPosition}
                  onClick={() => dispatch(fetchAddress())}
                  type="small"
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center space-x-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order..."
              : `Order Now from ${formatCurrency(isPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearItem());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
