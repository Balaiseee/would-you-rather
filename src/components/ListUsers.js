import User from "./User.js";

const ListUsers = (props) => {
  return props.users.map((user) => (
    <User key={user.id} id={user.id} />
  ));
};

export default ListUsers;
