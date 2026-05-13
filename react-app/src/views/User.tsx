import useUser from "../hooks/useUser";

function User() {
  const { updateData, disabled, statusText, data } = useUser();
  return (
    <div className="container">
      USER
      <button
        onClick={updateData}
        className="
        flex items-center gap-2
        rounded-lg
        bg-blue-600
        px-4 py-2
        text-white
        disabled:opacity-50
      "
        disabled={disabled}
      >
        {statusText}
      </button>
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
