export default function InputRow({ label, children }) {
  return (
    <div className="space-y-2">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
    </div>
  );
}
