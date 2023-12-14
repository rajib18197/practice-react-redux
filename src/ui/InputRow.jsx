export default function InputRow({label, error, children}) {
  return (
    <div className="space-y-2">
      {label && <label for={children.props.id}>{label}</label>}
      {children}
      {error && <p>{error}</p>}
    </div>
  );
}
