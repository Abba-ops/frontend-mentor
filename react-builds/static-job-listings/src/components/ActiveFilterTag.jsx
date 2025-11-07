import removeIcon from "../assets/images/icon-remove.svg";

export default function ActiveFilterTag({
  category,
  tag,
  onRemoveSingleFilter,
}) {
  return (
    <div className="flex">
      <div className="bg-light-grayish-cyan-tablet text-desaturated-dark-cyan rounded-l font-bold px-2.5 py-1">
        {tag}
      </div>
      <div
        onClick={onRemoveSingleFilter.bind(null, tag, category)}
        className="bg-desaturated-dark-cyan text-light-grayish-cyan-tablet rounded-r p-2.5 hover:bg-very-dark-grayish-cyan cursor-pointer">
        <img src={removeIcon} alt="Remove tag filter" />
      </div>
    </div>
  );
}
