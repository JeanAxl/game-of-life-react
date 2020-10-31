import React from 'react';

type Props = {
  height: number;
  width: number;
  setHeight: (a: number) => void;
  setWidth: (a: number) => void;
};

const ConfigurationPanel: React.FC<Props> = ({ height, setHeight, width, setWidth }: Props) => {
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
      </form>
    </div>
  );
};

export { ConfigurationPanel };
