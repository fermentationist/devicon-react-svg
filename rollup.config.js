// rollup.config.js
import {uglify} from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

const config = {
    input: "src/devicon-react-svg.js",
    external: ["react"],
    output: {
        format: "umd",
        name: "devicon-react-svg",
        globals: {
            react: "React"
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        uglify()
    ],
};
export default config;