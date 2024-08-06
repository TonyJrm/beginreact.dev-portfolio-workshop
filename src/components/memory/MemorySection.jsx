import { Button } from "../atom/Button";
import { SectionWrapper } from "../atom/SectionWrapper";
import { MemoryBoard } from "./MemoryBoard";
import { MemoryContextProvider, useMemory } from "./MemoryProvider";
import { Typography } from "../atom/Typography";

export const MemorySection = () => {
  return (
    <SectionWrapper title="You're boring ? Let's play a game !">
      <MemoryContextProvider>
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-2">
            <Tries />
            <MemoryBoard />
            <Reset />
          </div>
        </div>
      </MemoryContextProvider>
    </SectionWrapper>
  );
};

const Tries = () => {
  const { tryCount, isFinished } = useMemory();

  if (isFinished) {
    return <Typography>Hooray! You finished in {tryCount} times!</Typography>;
  }
  return (
    <Typography variant="body2">
      You tried {tryCount} {tryCount === 0 ? "time" : "times"}
    </Typography>
  );
};

const Reset = () => {
  const { reset } = useMemory();

  return <Button onClick={reset}>Reset</Button>;
};
