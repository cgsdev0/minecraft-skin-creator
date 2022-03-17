import React from "react";
import "./App.css";
import { SkinViewer } from "./SkinViewer";

// Order defined here is also the render order
export const parts = Object.freeze({
  base: "0",
  tabbard: "0",
  boots: "0",
  helmet: "0",
  gloves: "0",
});

type Props = typeof parts;

const blankCanvas = document.createElement("canvas");
blankCanvas.setAttribute("width", "64");
blankCanvas.setAttribute("height", "64");

// helper function to wrap fetching an image in a promise
function getImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
export function Character(props: Props) {
  const [ready, setReady] = React.useState(false);

  const canvas = React.useRef(document.createElement("canvas"));

  React.useEffect(() => {
    canvas.current.setAttribute("width", "64");
    canvas.current.setAttribute("height", "64");
  }, []);

  React.useEffect(
    () => {
      (async () => {
        // Start over with a clean canvas
        canvas.current.getContext("2d")?.clearRect(0, 0, 64, 64);

        // download all of the layers in parallel
        const parts_arr = Object.keys(parts) as Array<keyof typeof parts>;
        const layers = await Promise.all(
          parts_arr.map((part) =>
            getImage(`/images/${part}/${props[part]}.png`)
          )
        );

        // draw the layers to the canvas sequentially
        layers.forEach((layer) => {
          canvas.current.getContext("2d")?.drawImage(layer, 0, 0);
        });

        // trigger a re-render in the skinviewer
        setReady(false);
        setReady(true);
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      setReady,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...(Object.keys(parts) as Array<keyof typeof parts>).map(
        (part) => props[part]
      ),
    ]
  );

  return <SkinViewer skin={ready ? canvas.current : blankCanvas} />;
}
