import pathData from "./resources/extractedSVGPaths";
import React from "react";
import iconNames from "./resources/iconNames";

const DevIcon = props => {
    let icon = typeof props === "string" ? props : props.icon;
    const paths = pathData[icon].concat(props.addPaths);
    return (
        <React.Fragment>
            {props.children}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox || "0 0 36 36"} className={`${icon}-icon`} {...props}>
                {
                    paths.map(path => {
                        return (
                        <path d={path}></path>
                        );
                    })
                }
            </svg>
        </React.Fragment>
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
