import pathData from "./resources/extractedSVGPaths";
import React from "react";
import iconNames from "./resources/iconNames";

const DevIcon = props => {
    let icon = typeof props === "string" ? props : props.icon;
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox || "0 0 32 32"} className={`${icon}-icon`} {...props}>
            { 
                pathData[icon].map((path) => {
                    return (
                    <path d={path}></path>
                    );
                })
            }
            {props.children}
        </svg>
    );
}
export default DevIcon;

export const iconList = iconNames;

export const randomIconName = iconNames => iconNames[Math.floor(Math.random() * iconNames.length)];

export const RandomIcon = props => {
    return (
        <DevIcon icon={randomIconName(iconNames)} />
    )
}
