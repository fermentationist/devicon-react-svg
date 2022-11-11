import pathData from "./resources/pathData.js";
import React, { useState } from "react";
import iconNames from "./resources/iconNames.js";

const DevIcon = (props) => {
  const [strokeColor, setStrokeColor] = useState("inherit");
  const iconProps = typeof props === "string" ? props : props.icon; // name of icon
  const paths = pathData[iconProps] ? pathData[iconProps].paths : []; // lookup icon path data
  const styleProps = props.pathStyles ? props.pathStyles : []; // user added styles, passed as props, if any
  const diff = Math.max(0, paths.length - styleProps.length);
  const pathStyles = styleProps.concat(Array(diff).fill("")); //if array of styles is shorter than array of paths, fill-in style array with empty strings
  const definedViewBox = pathData[iconProps]
    ? pathData[iconProps].viewBox
    : null; // override viewBox settings defined in extractedSVGPaths.js when user passes custom viewBox values
  const DEFAULT_VIEWBOX = "0 0 32 32";
  const calculateStrokeColor = (currentRef) => {
    try {
      const computedFill =
        typeof window !== undefined && getComputedStyle(currentRef).fill;
      setStrokeColor(computedFill);
    } catch (error) {
      // do nothing
    }
  };
  return (
    <>
      {props.children}
      {!paths.length > 0 ? (
        <span className={`${iconProps}-icon-not-found`}>{props.icon}</span>
      ) : (
        <svg
          style={{ ["--strokeColor"]: strokeColor, ...props.styles }}
          ref={calculateStrokeColor}
          viewBox={props.viewBox || definedViewBox || DEFAULT_VIEWBOX}
          data-icon={iconProps}
          {...props}
        >
          {paths.map((pathObj, i) => {
            return (
              <path
                className="devicon-svg"
                d={pathObj.path}
                style={{ ...pathStyles[i], ...pathObj.style }}
                key={i}
              ></path>
            );
          })}
        </svg>
      )}
    </>
  );
};

export default DevIcon;

export const iconList = iconNames;

export const randomIconName = (iconNames) =>
  iconNames[Math.floor(Math.random() * iconNames.length)];

export const RandomIcon = (props) => {
  return <DevIcon icon={randomIconName(iconNames)} />;
};
