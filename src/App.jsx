import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [number, setNumber] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.floor(Math.random() * rgb);
    const hexCode = random.toString(16);
    const colorHex = hexCode.padStart(6, 0);
    return `#${colorHex}`;
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success(`Gradient code copied successfully \n ${css}`, {
      position: "top-center",
    });
  };

  const generateGradients = () => {
    let tempList = [];
    for (let i = 0; i < number; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();

      if (type === "linear") {
        const deg = Math.floor(Math.random() * 360);
        const degStr = `${deg}deg`;
        tempList.push({
          gradient: `linear-gradient(${degStr}, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degStr}, ${color1}, ${color2})`,
        });
      } else {
        tempList.push({
          gradient: `radial-gradient(${color1}, ${color2})`,
          css: `background: radial-gradient(${color1}, ${color2})`,
        });
      }
    }

    setGradients(tempList);
  };

  useEffect(() => {
    generateGradients();
  }, [number, type]);

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto space-y-8">
        <div
          className="flex justify-between p-6 rounded-full"
          id="header"
          style={{
            backdropFilter: "blur(12px) saturate(140%)",
            WebkitBackdropFilter: "blur(12px) saturate(140%)",
            background: "rgba(255,255,255,0.32)",
            borderColor: "rgba(255,255,255,0.4)",
          }}
        >
          <h1 className="text-3xl font-bold">🎨 Gradient Generator</h1>
          <div className="flex gap-4">
            <input
              className="bg-white border-slate-300 border rounded-lg w-[100px] p-2"
              type="number"
              placeholder="12"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
            <select
              className="bg-white border-slate-300 border rounded-lg w-[100px] p-2"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="px-8 py-2 bg-blue-500 rounded-full text-white font-medium"
              onClick={generateGradients}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {gradients.map((item, index) => (
            <div
              key={item + index}
              className="h-[180px] rounded relative"
              style={{
                background: item.gradient,
              }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className="bg-black/50 hover:bg-black text-white rounded absolute bottom-3 right-3 text-xs p-1 flex"
              >
                COPY
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
