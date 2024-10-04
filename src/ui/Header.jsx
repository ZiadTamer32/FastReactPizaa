import { Link } from "react-router-dom";
import Search from "../featuers/order/Search";
import UserName from "../featuers/user/UserName";

function Header() {
  return (
    <div className="font-pizza flex items-center justify-between border-b border-stone-800 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <Search />
      <UserName />
    </div>
  );
}

export default Header;
