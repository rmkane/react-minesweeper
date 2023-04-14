import * as React from 'react';

import Minesweeper from './components/Minesweeper';
import { Difficulty } from './utils/logic';

function App() {
  const [difficulty, setDifficulty] = React.useState<Difficulty>(
    Difficulty.BEGINNER,
  );

  return (
    <div className="App">
      <select
        value={difficulty}
        onChange={({ target: { value } }) => {
          setDifficulty(value as Difficulty);
        }}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
      <Minesweeper difficulty={difficulty} />
    </div>
  );
}

export default App;
