import pathData from "./resources/pathData.js";
import React, {Component} from "react";
import iconNames from "./resources/iconNames.js";

class DevIcon extends Component {
    constructor (props) {
        super(props);
        this.state = {
            strokeColor: null
        }
        this.iconProps = typeof props === "string" ? props : props.icon; // name of icon
        this.paths = pathData[this.iconProps] ? pathData[this.iconProps].paths : []; // lookup icon path data
        const styleProps = props.pathStyles ? props.pathStyles : []; // user added styles, passed as props, if any
        const diff = Math.max(0, this.paths.length - styleProps.length);
        this.pathStyles = styleProps.concat(Array(diff).fill("")); //if array of styles is shorter than array of paths, fill-in style array with empty strings
        this.componentStyles = {...this.props.styles};
        this.definedViewBox = pathData[this.iconProps] ? pathData[this.iconProps].viewBox : null; // override viewBox settings defined in extractedSVGPaths.js when user passes custom viewBox values
        this.DEFAULT_VIEWBOX = "0 0 32 32";
        this.setStrokeColor = this.setStrokeColor.bind(this);
    }
    setStrokeColor (thisComponent) {
        const computedFill = typeof window !== undefined && getComputedStyle(thisComponent).fill;
        this.setState({
            strokeColor: computedFill,
        })
    }
    render () {
        return (
            <React.Fragment>
                {this.props.children}
                {!this.paths.length > 0 ? (
                        <span className={`${this.iconProps}-icon-not-found`}>{this.props.icon}</span>
                        ) : (
                        <svg style={{["--strokeColor"]:this.state.strokeColor, ...this.props.styles}} ref={this.setStrokeColor} viewBox={this.props.viewBox || this.definedViewBox || this.DEFAULT_VIEWBOX} data-icon={this.iconProps}  {...this.props}>
                            {
                                this.paths.map((pathObj, i) => {
                                    return (<path className="devicon-svg" d={pathObj.path} style={{...this.pathStyles[i], ...pathObj.style}} key={i}></path>);
                                })
                            }
                        </svg>
                    )
                }
            </React.Fragment>
        );
    }
}

export default DevIcon;

export const iconList = iconNames;

export const randomIconName = iconNames => iconNames[Math.floor(Math.random() * iconNames.length)];

export const RandomIcon = props => {
    return (
        <DevIcon icon={randomIconName(iconNames)} />
    )
}
