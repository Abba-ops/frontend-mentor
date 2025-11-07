import { useState } from "react";
import JobCard from "./components/JobCard";
import Header from "./components/Header";
import JobBoard from "./components/JobBoard";
import jobList from "./data.json";

const INITIAL_FILTERS = {
  role: new Set(),
  level: new Set(),
  language: new Set(),
  tool: new Set(),
};

export default function App() {
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);

  const hasActiveFilters = Object.values(activeFilters).some(
    (filterSet) => filterSet.size > 0
  );

  function createFilterUpdater(action) {
    return function (tag, category) {
      setActiveFilters((prevFilters) => {
        const updatedFilters = Object.fromEntries(
          Object.entries(prevFilters).map(([key, value]) => [
            key,
            new Set(value),
          ])
        );
        if (action === "add") {
          updatedFilters[category].add(tag);
        } else if (action === "remove") {
          updatedFilters[category].delete(tag);
        }
        return updatedFilters;
      });
    };
  }

  function clearAllFilters() {
    setActiveFilters(INITIAL_FILTERS);
  }

  const addFilter = createFilterUpdater("add");
  const removeFilter = createFilterUpdater("remove");

  let visibleJobs = jobList;

  if (hasActiveFilters) {
    visibleJobs = jobList.filter((job) => {
      const roleMatches =
        !activeFilters.role.size || activeFilters.role.has(job.role);
      const levelMatches =
        !activeFilters.level.size || activeFilters.level.has(job.level);
      const languagesMatch =
        !activeFilters.language.size ||
        Array.from(activeFilters.language).every((lang) =>
          job.languages.includes(lang)
        );
      const toolsMatch =
        !activeFilters.tool.size ||
        job.tools.some((tool) => activeFilters.tool.has(tool));

      return roleMatches && levelMatches && languagesMatch && toolsMatch;
    });
  }

  return (
    <>
      <Header
        activeFilters={activeFilters}
        onClearAllFilters={clearAllFilters}
        onRemoveSingleFilter={removeFilter}
        hasActiveFilters={hasActiveFilters}
      />
      <JobBoard>
        {visibleJobs.map((job) => (
          <JobCard key={job.id} job={job} onTagSelect={addFilter} />
        ))}
      </JobBoard>
    </>
  );
}
