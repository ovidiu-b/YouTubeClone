export default class URLWithParams {
    private url: string;
    private params: string[] = [];

    constructor(url: string) {
        this.url = url;
    }

    public append(key: string, value: string): void {
        let previousSymbol = "&";

        if (this.params.length == 0) {
            previousSymbol = "";
        }

        this.params.push(`${previousSymbol}${key}=${value}`);
    }

    public build(): string {
        return `${this.url}?${this.params.join("")}`;
    }
}
