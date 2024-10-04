import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./CartSlice";

function DeleteButton({ id }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(deleteItem(id))} type="small">
      Delete
    </Button>
  );
}

export default DeleteButton;
