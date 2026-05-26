import useUser from "../hooks/useUser";
import BaseButton from "../shared/components/BaseButton";
function User() {
  const { updateData, disabled, statusText, data } = useUser();
  return (
    <div className="container">
      USER
      <BaseButton text={statusText} disabled={disabled} onClick={updateData} />
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.name}/{user.address.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default User;
