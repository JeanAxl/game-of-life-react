import React from 'react';

type Props = {
  start: () => void;
  pause: () => void;
  next: () => void;
  apply: () => void;
};

export const Controls: React.FC<Props> = ({ start, pause, next, apply }: Props) => {
  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={next}>next</button>
      <button onClick={pause}>pause</button>
      <button onClick={apply}>apply</button>
    </div>
  );
};
