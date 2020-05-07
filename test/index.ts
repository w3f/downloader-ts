import fs from 'fs-extra';
import nock from 'nock';
import path from 'path';
import tmp from 'tmp';

import { DownloadManager } from '../src/index';

import { should } from 'chai';

should();

const subject = new DownloadManager();

const expected = 'content';
const site = 'http://localhost:8000'
const file = 'index.html';
const target = `${site}/${file}`;


describe('Downloader', () => {
    describe('getFile', () => {
        beforeEach(() => {
            nock(site)
                .get(`/${file}`)
                .reply(200, expected);
        });

        it('downloads files and saves them', async () => {
            const mainTmp = tmp.fileSync();

            await subject.getFile(target, mainTmp.name);

            const actual = fs.readFileSync(mainTmp.name).toString();

            actual.should.eq(expected);
        });

        it('creates target path if it doesnt exist', async () => {
            const mainDir = tmp.dirSync();

            const targetPath = path.join(mainDir.name, 'test1', 'test2', file);

            await subject.getFile(target, targetPath);

            const actual = fs.readFileSync(targetPath).toString();

            actual.should.eq(expected);
        });
    });
})
