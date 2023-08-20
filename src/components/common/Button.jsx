export const Button = ({ label, onClick, style }) => {
  return (
    <section className="button">
      <button onClick={onClick} style={style}>
        {label}
      </button>
    </section>
  );
};
