import React from 'react';

type Props = {
  height: number;
  width: number;
  randomize: boolean;
  setHeight: (a: number) => void;
  setWidth: (a: number) => void;
  setRandomize: any;
};

const ConfigurationPanel: React.FC<Props> = ({
  height,
  setHeight,
  width,
  setWidth,
  randomize,
  setRandomize,
}: Props) => {
  return (
    <div>
      <form>
        <div>
          <label>
            Height:
            <input type="number" max={100} min={1} value={height} onChange={(e) => setHeight(+e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Width:
            <input
              type="number"
              max={100}
              min={1}
              name="width"
              value={width}
              onChange={(e) => setWidth(+e.target.value)}
            />
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="randomize"
            name="randomize"
            checked={randomize}
            onChange={() => {
              setRandomize(!randomize);
            }}
          />
          <label htmlFor="randomize">Scales</label>
        </div>
      </form>
    </div>
  );
};

export { ConfigurationPanel };
