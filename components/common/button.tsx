export const Button = ({ children, extraConfig = null, ...props }) => {
  return (
    <button className={`mx-2 rounded-sm ${!!extraConfig ? extraConfig : ''}`} {...props}>
      {children}
    </button>
  );
}