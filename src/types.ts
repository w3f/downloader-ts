export interface Downloader {
    getFile(url: string, filePath: string): Promise<void>;
}
