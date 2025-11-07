export default function FilterTag({ label, ...props }) {
  return (
    <button
      {...props}
      className="cursor-pointer bg-light-grayish-cyan-tablet text-desaturated-dark-cyan font-bold rounded px-2.5 py-1 hover:bg-desaturated-dark-cyan hover:text-light-grayish-cyan-tablet">
      {label}
    </button>
  );
}
