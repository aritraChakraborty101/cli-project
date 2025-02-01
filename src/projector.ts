import { Config } from './config'
import * as fs from 'fs'
import * as path from 'path'

export type Data = {
    projecter: {
        [key: string]: {
            [key: string]: string,
        }
    }
}

const defaultData: Data = {
    projecter: {}
}

export default class Projector {
    constructor(private config: Config, private data: Data) {}

    getValueAll(): { [key: string]: string } {
        let curr: string = this.config.pwd;
        let prev: string = "";
        const out: { [key: string]: string } = {};
        const paths: string[] = [];
        
        do {
            prev = curr;
            paths.push(curr);
            curr = path.dirname(curr);
        } while (curr !== prev);
    
        return paths.reverse().reduce((acc, curr) => {
            const value = this.data.projecter[curr];
            if (value) {
                Object.assign(acc, value);
            }
            return acc;
        }, out); 
    }

    getValue(key: string): string | undefined {
        let curr: string = this.config.pwd;
        let prev: string = "";
        let out: string | undefined = undefined;
        do {
            const value = this.data.projecter[curr]?.[key];
            if (value) {
                out = value;
                break;
            }
            prev = curr;
            curr = path.dirname(curr);
        } while (curr !== prev);
        return out;
    }

    setValue(key: string, value: string): void {
        if (!this.data.projecter[this.config.pwd]) { 
            this.data.projecter[this.config.pwd] = {}; // ✅ Initialize first
        }
        this.data.projecter[this.config.pwd][key] = value; // ✅ Directly assign the value
    }
    
    removeValue(key: string): void {
        let dir = this.data.projecter[this.config.pwd];
        if (dir) {
            delete dir[key];
        }
    }

    save(): void {
        const configPath: string = path.dirname(this.config.config);
        if (!fs.existsSync(configPath)) {
            fs.mkdirSync(configPath, { recursive: true });
        }
        fs.writeFileSync(this.config.config, JSON.stringify(this.data, null, 2));
    }

    static fromConfig(config: Config): Projector {
        if (fs.existsSync(config.config)) {
            let data: Data;
            try {
                data = JSON.parse(fs.readFileSync(config.config).toString()) as Data;
            } catch (e) {
                data = defaultData;
            }
            return new Projector(config, data);
        }
        return new Projector(config, defaultData);
    }
}
