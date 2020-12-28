import pathData from "./pathData";

export default Object.keys(pathData) as (keyof typeof pathData)[];
