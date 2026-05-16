import type { CSSProperties } from "react";
import type { Destination } from "../_lib/destinations";
import {
  getThrowMotionDuration,
  THROW_FLIGHT_DURATION,
} from "../_lib/destinations";

type PolygonThrowSceneProps = {
  destination: Destination;
};

export function PolygonThrowScene({ destination }: PolygonThrowSceneProps) {
  const motionDuration = getThrowMotionDuration(destination.level);
  const spaceOpacity = destination.level >= 7 ? 0.85 : 0.34;

  const sceneStyle = {
    "--motion-duration": `${motionDuration}ms`,
    "--flight-duration": `${THROW_FLIGHT_DURATION}ms`,
    "--space-opacity": spaceOpacity,
  } as CSSProperties;

  return (
    <div className="polygon-scene" style={sceneStyle} aria-hidden="true">
      <div className="polygon-skyline">
        <span />
        <span />
        <span />
      </div>
      <div className="throw-arc">
        <span />
        <span />
        <span />
      </div>
      <div className="destination-orb">
        <span>{destination.icon}</span>
      </div>

      <div className="polygon-person">
        <div className="ground-shadow" />
        <div className="polygon-leg polygon-leg-left" />
        <div className="polygon-leg polygon-leg-right" />
        <div className="polygon-body">
          <span className="body-face body-face-a" />
          <span className="body-face body-face-b" />
          <span className="body-face body-face-c" />
        </div>
        <div className="polygon-head">
          <span className="head-face head-face-a" />
          <span className="head-face head-face-b" />
          <span className="head-face head-face-c" />
          <span className="angry-brow angry-brow-left" />
          <span className="angry-brow angry-brow-right" />
          <span className="eye eye-left" />
          <span className="eye eye-right" />
          <span className="mouth" />
        </div>
        <div className="polygon-arm polygon-arm-back">
          <span className="upper-arm" />
          <span className="forearm" />
          <span className="hand" />
        </div>
        <div className="polygon-arm polygon-arm-front">
          <span className="upper-arm" />
          <span className="forearm" />
          <span className="hand" />
        </div>
      </div>

      <div className="complaint-paper">
        <span className="paper-fold" />
        <span className="complaint-line line-a" />
        <span className="complaint-line line-b" />
        <span className="complaint-line line-c" />
        <span className="complaint-line line-d" />
      </div>

      <div className="paper-ball">
        <span className="crease crease-a" />
        <span className="crease crease-b" />
        <span className="crease crease-c" />
      </div>
    </div>
  );
}
