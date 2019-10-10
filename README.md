# devicon-react-svg

**devicon-react-svg** is an implementation of the **[Devicons](http://vorillaz.github.io/devicons/)** icon library (which contains the logos of various popular programming languages, frameworks and design and development tools) for **React**. 

**devicon-react-svg** returns a functional React component that, when passed the name of a Devicon as the `icon` prop, will render it as an inline SVG (Scalable Vector Graphics) image.

---
## Installation
To install with **npm**:
```bash
npm install --save devicon-react-svg
```
To install with **Yarn**:
```bash
yarn add devicon-react-svg
```
---
## Usage
Import the default export from **devicon-react-svg** and use it in your JSX as you would any other React component. It accepts the prop `icon`, which should be the name of the Devicon as a string.

```js
import React from "react";
import ReactDOM from "react-dom";
import DevIcon from "devicon-react-svg";

const Demo = props => {
    return (<DevIcon icon="react" />);
}

ReactDOM.render(<Demo/>, document.getElementById('root'));
```
---
You can style the SVG component by passing in a `style` prop or a `viewBox` prop, like this...

```js 
const devIconStyle = {
    fill: "thistle",
    width: "150px",
};

const Demo = props => {
    return (
        <DevIcon icon="react" style={devIconStyle} viewBox="0 0 32 32"/>
        );
}
```
or by using a library like **[styled-components](https://www.npmjs.com/package/styled-components)**...

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
---
## Additional exports
A list of the icon names accepted by the component can be found in the [Devicons cheatsheet](http://vorillaz.github.io/devicons/#/cheat), or can be returned as an array by using the package's `iconList` export. **devicon-react-svg** also exports the `RandomIcon` component to display a randomly chosen icon.

```js
import DevIcon, {iconList, RandomIcon} from "devicon-react-svg";

console.log(`Here is a list of icon names used by this component: ${iconList}`);

const Demo = props => {
    return (<RandomIcon />);
}
```

---
## Credits

**devicon-react-svg** was made by Dennis Hodges, a Javascript developer.

Thank you to [Theodore Vorillas](https://www.vorillaz.com/), who created the font and icon collection that this component is based on, and which is the source of all of the svg path data used in this package.

You can find his original icon repository here: [Devicons](https://github.com/vorillaz/devicons).

---
## License

#### Copyright © 2019 [Dennis Hodges](https://github.com/fermentationist) 


__The MIT License__

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.