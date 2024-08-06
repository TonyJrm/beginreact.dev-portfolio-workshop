import { useFetch } from "../../hooks/useFetch";
import { commentsUrl } from "../../lib/api-url";
import { Loader } from "../atom/Loader/Loader";
import { SectionWrapper } from "../atom/SectionWrapper";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

export const CommentSection = () => {
  const {
    data: comments,
    isResolved,
    isLoading,
    isIdle,
    isRejected,
    error,
    run,
  } = useFetch(commentsUrl);
  console.log(comments);

  return (
    <SectionWrapper title="On est à l'époque de FaceBook ?">
      <div className="flex flex-col items-center w-full max-w-2xl gap-8 m-auto ">
        <div className="grid justify-center w-full gap-4 grid-cols-auto-fill-200-300">
          {isLoading || isIdle ? <Loader /> : null}
          {isResolved
            ? comments.map((com) => <Comment key={com.id} {...com} />)
            : null}
          {isRejected ? <p>{String(error)}</p> : null}
        </div>
        <CommentForm updateComments={run} />
      </div>
    </SectionWrapper>
  );
};
