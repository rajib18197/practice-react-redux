export default function ConfigurationBox() {
  return (
    <div className="flex flex-col gap-6">
      <FontStyle fonts={["default", "Mono", "Sans-Serif"]} />
      <Design options={["small text", "full width"]} />
    </div>
  );
}

function FontStyle({ fonts }) {
  return (
    <div>
      <Heading as="h3">Font Style</Heading>
      <div className="flex gap-3 rounded">
        {fonts.map((font) => (
          <Heading key={font} className="bg-stone-800 text-stone-100">
            {font}
          </Heading>
        ))}
      </div>
    </div>
  );
}

function Design({ options }) {
  return (
    <div>
      {options.map((option) => (
        <div key={option} className="flex justify-between items-center">
          <Heading as="h4">{option}</Heading>
          <input type="checkbox" />
        </div>
      ))}
    </div>
  );
}

export function Heading({ as = "h1", className, children }) {
  const Type = as;

  return <Type className={`uppercase text-xl ${className}`}>{children}</Type>;
}
