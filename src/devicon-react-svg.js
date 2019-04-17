import pathData from "./resources/extractedSVGPaths";
import React from "react";
import iconNames from "./resources/iconNames";

const DevIcon = props => {
    const iconProps = typeof props === "string" ? props : props.icon;
    const paths = iconProps.split(" ")
        .map(x => pathData[x])
        .reduce((accum, x) => accum.concat(x));
    return (
        <React.Fragment>
            {props.children}
            {   !paths ? (
                    <span className={`${iconProps}-icon-not-found`}>{props.icon}</span>
                    ) : (
                    <svg viewBox={props.viewBox || "0 0 32 32"} className={`${iconProps}-icon`} data-icon={iconProps}  {...props}>
                        {
                            paths.map((path, i) => {
                                return (<path d={path} key={i}></path>);
                            })
                        }
                    </svg>
                )
            }
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
