export default function Select({
  options,
  value,
  onChange,
  isUpdating,
  ...props
}) {
  console.log(value);
  return (
    <select
      value={value}
      className="lws-status"
      onChange={onChange}
      disabled={isUpdating}
      {...props}
    >
      {isUpdating ? (
        <option value={"updating"}>updating</option>
      ) : (
        options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))
      )}
    </select>
  );
}


