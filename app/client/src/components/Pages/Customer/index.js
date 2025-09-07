import CustomerList from "./CustomerList";
import CustomerPost from "./CustomerPost";
import CustomerEdit from "./CustomerEdit";

const Customer = {
  list: CustomerList,
  create: CustomerPost,
  edit: CustomerEdit
};

export default Customer;