import { Link } from "react-router-dom";
// sm:px-6 sm:py-4 px-4 py-3
function Button({ children, disabled, to, type, onClick }) {
  const className =
    "rounded-full text-sm inline-block bg-yellow-400 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: className + " sm:px-6 sm:py-4 px-4 py-3",
    small: className + " px-4 py-2 text-xs",
    round: className + " px-2 py-0.5 text-md md:px-3 md:py-1",
    secondary:
      " sm:px-6 sm:py-4 px-4 py-3 rounded-full inline-block border-2 border-stone-300  font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed",
  };
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
