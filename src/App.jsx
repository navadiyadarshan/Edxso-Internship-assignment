import React, { useState } from "react";

function App() {
  const [clickedBoxes, setClickedBoxes] = useState([]); // store clicked box sequencially
  const [boxes, setBoxes] = useState(Array(9).fill("bg-gray-300")); // update colur with all the boxes
  const [scaling, setScaling] = useState(Array(9).fill(false)); // animation for cliking button
  const [isResetAvailable, setIsResetAvailable] = useState(false); // Start with the reset button disabled

  const handleClick = (e,index) => {
    // prevent from programmitical clicks
    if (!e.isTrusted) return;

    // if already clicked
    if (clickedBoxes.includes(index)) return;

    const newClickedBoxes = [...clickedBoxes, index];
    const newColors = [...boxes];
    const newScaling = [...scaling];
    
    newColors[index] = "bg-green-500";
    newScaling[index] = true;

    setClickedBoxes(newClickedBoxes);
    setBoxes(newColors);
    setScaling(newScaling);

    // used to animation of clicking box (used to resize the box size)
    setTimeout(() => {
      newScaling[index] = false;
      setScaling([...newScaling]);
    }, 300);

    // animation for color change to green to orange
    if (newClickedBoxes.length === 9) {
      newClickedBoxes.forEach((boxIdx, i) => {
        setTimeout(() => {
          setBoxes((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[boxIdx] = "bg-orange-500";
            setBoxes(updatedColors);

            // If all boxes are orange, enable the reset button
            if (updatedColors.every(color => color === "bg-orange-500")) {
              setIsResetAvailable(true);
            }
            return updatedColors;
          });
        }, i * 500);
      });
    }
  };

  // reset the all thing without relaod page
  const handleReset = () => {
    setClickedBoxes([]);
    setBoxes(Array(9).fill("bg-gray-300"));
    setScaling(Array(9).fill(false));
    setIsResetAvailable(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1f242d] flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">Color Box Clicker Game</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {boxes.map((color, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center border rounded-lg transition-all duration-300 ease-in-out ${color} cursor-pointer transform ${scaling[index] ? "scale-110" : "scale-100"}`}
            onClick={(e) => handleClick(e, index)}
          ></div>
        ))}
      </div>
      <button 
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        onClick={handleReset}
        disabled={!isResetAvailable} // Disable button until all boxes are orange
      >
        {isResetAvailable ? "Reset" : "You need to finish first"}
      </button>
      <a href="https://github.com/navadiyadarshan/Edxso-Internship-assignment" target="_blank"><p className="text-white p-2 bg-blue-600 mt-3 rounded-lg">Go To Source Code</p></a>
    </div>
  );
}

export default App;
