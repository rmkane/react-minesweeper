import * as React from 'react';

import Minesweeper, { Difficulty } from './components/Minesweeper';

function App() {
  const [difficulty, setDifficulty] = React.useState<Difficulty>('beginner');

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
