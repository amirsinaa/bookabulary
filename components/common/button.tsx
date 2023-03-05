export const Button = ({ children, classOverrides = null, ...props }) => {
  return (
    <button className={`${!!classOverrides ? classOverrides : 'mx-2 rounded-md'}`} {...props}>
      {children}
    </button>
  );
}