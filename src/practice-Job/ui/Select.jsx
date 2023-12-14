/******* IMPORTANT {OPEN IT FOR REFRESH THE IDEA} -  https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components
==== Search Prompt on google = "JS Set Attribute conditionally"
*******/

export default function Select({ options, value, onChange, ...props }) {
  return (
    <select value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          hidden={option?.initial}
        //   selected={option?.initial}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
