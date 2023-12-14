export default function Heading({ as = "h1", className, children }) {
  const Type = as;

  return (
    <Type
      className={`mt-4 mb-8 text-3xl font-bold text-center text-gray-800 ${className}`}
    >
      {children} 
    </Type>
  );
}
