import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { Logger, createLogger } from '@w3f/logger';


export class Downloader {
    private _logger: Logger;

    constructor(private logger?: Logger) {
        if (!logger) {
            this._logger = createLogger();
        } else {
            this._logger = logger;
        }
    }

    async getFile(url: string, filePath: string): Promise<void> {
        const dirPath = path.dirname(filePath);
        await fs.ensureDir(dirPath);

        const writer = fs.createWriteStream(filePath);

        this._logger.debug(`Requesting ${url}`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        });
    }
}
