import FilterTag from "./FilterTag";

export default function JobCard({ job, onTagSelect }) {
  const {
    logo,
    company,
    new: isNew,
    featured,
    position,
    postedAt,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = job;

  return (
    <li className="bg-white relative flex flex-wrap gap-4 max-md:flex-col justify-between md:items-center max-md:px-4 max-md:pt-8 max-md:pb-5 md:p-8 rounded-md border-l-4 border-l-desaturated-dark-cyan">
      <div className="flex items-center gap-6 max-md:pb-3 max-md:border-b max-md:border-b-dark-grayish-cyan">
        <img
          src={logo}
          className="max-md:absolute max-md:w-11 max-md:-top-5 max-md:left-4"
          alt={position}
        />
        <div className="space-y-1">
          <div className="space-x-3.5">
            <span className="font-bold text-desaturated-dark-cyan">
              {company}
            </span>
            {isNew && (
              <span className="bg-desaturated-dark-cyan text-light-grayish-cyan-tablet text-xs font-medium inline-block uppercase rounded-full px-2 py-0.5">
                New!
              </span>
            )}
            {featured && (
              <span className="bg-very-dark-grayish-cyan text-light-grayish-cyan-tablet text-xs font-medium inline-block uppercase rounded-full px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <h1 className="font-bold text-very-dark-grayish-cyan hover:text-desaturated-dark-cyan md:text-xl">
            {position}
          </h1>
          <ul className="list-disc list-inside text-dark-grayish-cyan flex gap-3">
            <li className="list-none">{postedAt}</li>
            <li>{contract}</li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-3.5">
        <FilterTag
          label={role}
          type={"role"}
          onClick={() => onTagSelect(role, "role")}
        />
        <FilterTag
          label={level}
          type={"level"}
          onClick={() => onTagSelect(level, "level")}
        />
        {languages.map((language, index) => (
          <FilterTag
            key={index}
            label={language}
            onClick={() => onTagSelect(language, "language")}
            type={"language"}
          />
        ))}
        {tools.map((tool, index) => (
          <FilterTag
            key={index}
            onClick={() => onTagSelect(tool, "tool")}
            type={"tool"}
            label={tool}
          />
        ))}
      </div>
    </li>
  );
}
