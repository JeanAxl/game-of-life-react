import React from 'react';

type Props = {
  start: () => void;
  pause: () => void;
  next: () => void;
};

export const Controls: React.FC<Props> = ({ start, pause, next }: Props) => {
  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={next}>next</button>
      <button onClick={pause}>pause</button>
    </div>
  );
};
