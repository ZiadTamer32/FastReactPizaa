import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../featuers/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isCartVisible = true;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header></Header>
      {isLoading && <Loader />}
      <div>
        <main className="mx-auto max-w-3xl">
          <Outlet></Outlet>
        </main>
      </div>
      <CartOverview isFixed={isCartVisible}></CartOverview>
    </div>
  );
}

export default AppLayout;
