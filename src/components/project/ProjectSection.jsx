import { SectionWrapper } from "../atom/SectionWrapper";
import { Project } from "./Project";
import { getListOfUrlRepositoriesUrl } from "../../lib/api-url";
import { GITHUB_USERNAME } from "../../lib/config";
import { Loader } from "../atom/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";

export const ProjectSection = () => {
  const {
    status,
    data: repositories,
    error,
  } = useFetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME));

  if (status === "pending" || status === "idle") {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        {repositories?.map((repo) => {
          return <Project key={repo.name} {...repo} />;
        })}
      </div>
    </SectionWrapper>
  );
};
