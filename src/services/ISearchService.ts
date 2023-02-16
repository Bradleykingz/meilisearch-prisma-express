import {SearchResponse} from "meilisearch";

export interface ISearchService<T> {
    search(indexName: string, query: string): Promise<SearchResponse<T>>;

    addToIndex(indexName: string, documents: T[]): Promise<void>;

    createIndex(name: string): Promise<void>;
}