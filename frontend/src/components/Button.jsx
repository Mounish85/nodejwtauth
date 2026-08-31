export default function Button({ children, variant = 'primary', loading, className = '', ...props }) {
  return <button {...props} disabled={loading || props.disabled} className={`button button--${variant} ${className}`}>{loading ? <><i className="spinner" />Please wait</> : children}</button>;
}
