import { URLWithParams } from "@/utils/module";

export default abstract class YoutubeClientBase {
    protected readonly urlParams: URLWithParams;

    constructor(url: string) {
        this.urlParams = new URLWithParams(url);
    }

    setPart(key: string) {
        this.urlParams.append("part", key);
        return this;
    }

    setPartId() {
        this.urlParams.append("part", "id");
        return this;
    }

    setPartSnippet() {
        this.urlParams.append("part", "snippet");
        return this;
    }

    setPartStatistics() {
        this.urlParams.append("part", "statistics");
        return this;
    }

    setPartContentDetails() {
        this.urlParams.append("part", "contentDetails");
        return this;
    }

    setChartMostPopular() {
        this.urlParams.append("chart", "mostPopular");
        return this;
    }

    setMaxResults(maxResults: number) {
        this.urlParams.append("maxResults", maxResults.toString());
        return this;
    }

    abstract execute(): Promise<any>;
}
