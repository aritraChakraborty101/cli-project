import cli from "command-line-args";

export type Opts = {
    args?: string[],
    pwd?: string,
    config?: string,
};

const optionDefinitions = [
    {
        name: "args",
        defaultOption: true,
        multiple: true,
        type: String
    },
    {
        name: "config",
        alias: "c",
        type: String
    },
    {
        name: "pwd",
        alias: "p",
        type: String,
    }
];

export default function getOpts(): Opts {
    return cli(optionDefinitions) as Opts;
}