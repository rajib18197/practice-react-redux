export default function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 w-full bg-blue-600 text-stone-100 rounded"
      onClick={onClick}
    > 
      {children}
    </button>
  );
}
