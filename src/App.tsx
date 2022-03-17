import React from "react";
import "./App.css";
import { Character, parts } from "./Character";

// mod a by b; always return a positive number
function saneMod(a: number, b: number) {
  return ((a % b) + b) % b;
}

function App() {
  const [characterState, setCharacterState] = React.useState(
    JSON.parse(JSON.stringify(parts))
  );

  const callback =
    (part: keyof typeof parts, direction: "next" | "previous") => () => {
      const characterStateNew = Object.assign({}, characterState);

      // this part is just for the sample;
      // we would want a different system once we have actual files to loop through
      const change = direction === "next" ? 1 : -1;
      characterStateNew[part] = `${saneMod(
        Number(characterState[part]) + change,
        3
      )}`;
      setCharacterState(characterStateNew);
    };

  return (
    <div className="App">
      {(Object.keys(parts) as Array<keyof typeof parts>).map((part) => (
        <React.Fragment key={part}>
          <button onClick={callback(part, "previous")}>Previous {part}</button>
          <button onClick={callback(part, "next")}>Next {part}</button>
          <br></br>
        </React.Fragment>
      ))}

      <Character {...characterState} />
    </div>
  );
}

export default App;
