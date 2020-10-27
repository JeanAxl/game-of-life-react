import React from 'react';

const ConfigurationPanel: React.FC = () => {
  return (
    <div>
      <form>
        <label>
          Height:
          <input type="text" name="height" />
        </label>
        <label>
          Width:
          <input type="text" name="width" />
        </label>
      </form>
    </div>
  );
};

export { ConfigurationPanel };
