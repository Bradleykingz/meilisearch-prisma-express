

class Env {

    get(key: string): string | undefined {
        return process.env[key];
    }
}

export const env = new Env();