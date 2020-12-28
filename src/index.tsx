import pathData from "./resources/pathData";
import React, { Component } from "react";
import iconNames from "./resources/iconNames";

export type DevIconProps = {
  children?: React.ReactNode;

  icon: keyof typeof pathData;
  pathStyles?: React.CSSProperties[];
  viewBox?: string;

  styles?: React.CSSProperties;
}

export type DevIconState = {
  fill: React.CSSProperties['fill'];
}

export default class DevIcon extends Component<DevIconProps, DevIconState> {
  protected paths: {
    path: string;
    style: Partial<Record<string, string>> | null;
  }[];

  protected pathStyles: React.CSSProperties[];

  protected static readonly DEFAULT_VIEWBOX = "0 0 32 32";
  protected definedViewBox: string | null;

  state: DevIconState = {
    fill: undefined,
  };

  constructor(props: DevIconProps) {
    super(props);

    this.paths = pathData[props.icon]?.paths ?? []; // lookup icon path data

    const styleProps = props.pathStyles ? props.pathStyles : []; // user added styles, passed as props, if any
    const diff = Math.max(0, this.paths.length - styleProps.length);
    this.pathStyles = styleProps.concat(Array(diff).fill("")); //if array of styles is shorter than array of paths, fill-in style array with empty strings

    this.definedViewBox = pathData[props.icon]?.viewBox; // override viewBox settings defined in extractedSVGPaths.js when user passes custom viewBox values
  }

  protected setStrokeColor = (svg: SVGSVGElement) => {
    const computedFill = (typeof window !== undefined) ? getComputedStyle(svg).fill : null;
    this.setState({ fill: (computedFill as React.CSSProperties['fill']) });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {!(this.paths.length > 0) ? (
          <span className={`${this.props.icon}-icon-not-found`}>{this.props.icon}</span>
        ) : (
            <svg
              style={{
                fill: this.state.fill,
                ...this.props.styles,
              }}
              ref={this.setStrokeColor}
              viewBox={this.props.viewBox || this.definedViewBox || DevIcon.DEFAULT_VIEWBOX}
              data-icon={this.props.icon}
              {...this.props}
            >
              {this.paths.map((pathObj, i) => {
                return (
                  <path
                    className="devicon-svg"
                    d={pathObj.path}
                    style={{
                      ...this.pathStyles[i],
                      ...pathObj.style,
                    }}
                    key={i}
                  />
                );
              })}
            </svg>
          )}
      </React.Fragment>
    );
  }
}

export const iconList = iconNames;

export const randomIconName = (iconNames: typeof iconList) => iconNames[Math.floor(Math.random() * iconNames.length)];

export const RandomIcon = () => {
  return (
    <DevIcon icon={randomIconName(iconNames)} />
  )
}
