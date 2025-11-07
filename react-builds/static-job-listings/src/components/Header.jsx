import ActiveFilterTag from "./ActiveFilterTag";

export default function Header({
  activeFilters,
  hasActiveFilters,
  onClearAllFilters,
  onRemoveSingleFilter,
}) {
  return (
    <header className="bg-desaturated-dark-cyan bg-[url('/images/bg-header-mobile.svg')] md:bg-[url('/images/bg-header-desktop.svg')] bg-no-repeat bg-cover relative min-h-44">
      {hasActiveFilters && (
        <div className="bg-white max-w-[calc(80rem-3rem)] mx-auto absolute -bottom-8 left-6 right-6 px-5 md:px-9 py-5 flex justify-between rounded-md">
          <div className="flex flex-wrap gap-3.5">
            {Object.entries(activeFilters).map(([category, tags]) =>
              Array.from(tags).map((tag) => (
                <ActiveFilterTag
                  tag={tag}
                  category={category}
                  onRemoveSingleFilter={onRemoveSingleFilter}
                  key={`${category}-${tag}`}
                />
              ))
            )}
          </div>
          <button
            onClick={onClearAllFilters}
            className="font-bold cursor-pointer text-dark-grayish-cyan hover:text-desaturated-dark-cyan hover:underline">
            Clear
          </button>
        </div>
      )}
    </header>
  );
}
