import fs from 'fs-extra';
import nock from 'nock';
import tmp from 'tmp';

import { Downloader } from '../src/index';

import { should } from 'chai';

should();

const subject = new Downloader();


describe('Downloader', () => {
    describe('getFile', () => {
        it('downloads files and saves them', async () => {
            const expected = 'content';
            const site = 'http://localhost:8000'
            const file = 'index.html';

            nock(site)
                .get(`/${file}`)
                .reply(200, expected);

            const mainTmp = tmp.fileSync();

            const target = `${site}/${file}`;

            await subject.getFile(target, mainTmp.name);

            const actual = fs.readFileSync(mainTmp.name).toString();

            actual.should.eq(expected);
        });

        it('creates target path if it doesnt exxist', async () => {

        });
    });
})
