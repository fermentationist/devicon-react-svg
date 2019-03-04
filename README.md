# devicon-react-svg

**devicon-react-svg** is an implementation of the [Devicons](https://github.com/vorillaz/devicons) icon set by  Theodore Vorillas, which contains the logos of various popular programming languages, frameworks and design and development tools. 

**devicon-react-svg** returns a functional React component that, when passed the name of a Devicon as the `icon` prop, will render the Devicon as an inline svg.

## Installation
To install with **npm**:
```bash
npm install "devicon-react-svg" --save
```
with **Yarn**:
```bash
yarn add "devicon-react-svg"
```

## Usage
Import the default export from **devicon-react-svg** and use it in your JSX as you would any other React component. It accepts the prop `icon`, which should be the name of the Devicon as a string.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import DevIcon from "devicon-react-svg";

const Demo = props => {
    return (<DevIcon icon="react" />);
}

ReactDOM.render(<Demo/>, document.getElementById('root'));
```

You can style the svg component by passing in a `style` prop or a `viewBox` prop, like this...

```js 
const devIconStyle = {
    fill: "thistle",
    width: "150px",
}

const Demo = props => {
    return (
        <DevIcon icon="react" style={devIconStyle} viewBox="0 0 32 32"/>
        );
}
```

or by using a fun package like [styled-components](https://www.npmjs.com/package/styled-components)...

```js 
import styled from "styled-components";

const StyledIcon = styled(DevIcon)`
    fill: thistle;
    width: 150px;
`;

const Demo = props => {
    return (<StyledIcon icon="css3" />);
}
```
## Credits
All of the SVG files were taken directly from the [Devicon](https://github.com/konpa/devicon) library created by [konpa](https://github.com/konpa).

React Devicon is an open source project created by [Fernando Poumián](https://github.com/fpoumian) and released under the **MIT license**.