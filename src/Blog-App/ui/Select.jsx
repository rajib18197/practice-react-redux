export default function Select({ options, value, onChange, ...props }) {
  return (
    <select
      name="sort"
      id="lws-sort"
      className="w-100 p-2 border-2 border-orange-600 rounded-md text-gray-500"
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
