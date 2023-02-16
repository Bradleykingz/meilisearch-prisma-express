import {Index, MeiliSearch, MeiliSearchError, SearchResponse} from 'meilisearch';
import {ISearchService} from "./ISearchService";

export class MsSearchService<T> implements ISearchService<T> {
    private client: MeiliSearch;

    constructor() {
        this.client = new MeiliSearch({
            host: 'http://localhost:7700',
        });
    }

    async createIndex(indexName: string): Promise<void> {
        await this.client.createIndex(indexName);
    }

    async addToIndex(indexName: string, documents: T[]): Promise<void> {
        try {
            const index: Index<T> = await this.client.getIndex(indexName);
            await index.addDocuments(documents);
        }catch (e: any){
            if (e.code === "index_not_found") {
                await this.createIndex(indexName);
                await this.addToIndex(indexName, documents);
                console.log("Index created and documents added")
            } else {
                console.error("Error adding documents to index", e)
            }
        }
    }

    async updateIndex(indexName: string, documents: T[]): Promise<void> {
        const index: Index<T> = await this.client.getIndex(indexName);
        await index.updateDocuments(documents);
    }

    async search(indexName: string, query: string): Promise<SearchResponse<T>> {
        const index: Index = await this.client.getIndex(indexName);
        return await index.search(query);
    }

    async deleteFromIndex(indexName: string, id: number): Promise<void> {
        const index: Index = await this.client.getIndex(indexName);
        await index.deleteDocument(id);
    }
}