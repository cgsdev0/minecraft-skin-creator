import React from "react";
import * as skinview3d from "skinview3d";
import "./App.css";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  skin?: any;
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 400;

export function SkinViewer({ width, height, className, skin }: Props) {
  const canvasRef = React.useRef<any>();
  const viewerRef = React.useRef<any>();

  React.useEffect(
    () => {
      const viewer = new skinview3d.SkinViewer({
        canvas: canvasRef.current,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      });
      viewerRef.current = viewer;

      let control = skinview3d.createOrbitControls(viewer);
      control.enableRotate = true;
      control.enableZoom = false;
      control.enablePan = false;

      // Add animation
      viewer.animations.add(skinview3d.WalkingAnimation);
      viewer.animations.add(skinview3d.RotatingAnimation);

      skin && viewer.loadSkin(skin);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    viewerRef.current.width = width || DEFAULT_WIDTH;
  }, [width]);

  React.useEffect(() => {
    viewerRef.current.height = height || DEFAULT_HEIGHT;
  }, [height]);

  React.useEffect(() => {
    skin && viewerRef.current.loadSkin(skin);
  }, [skin]);

  return <canvas ref={canvasRef} className={className} />;
}
