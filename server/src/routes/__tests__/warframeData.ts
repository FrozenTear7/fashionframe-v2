import { setupTests } from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import frames from '../../../public/warframe_data/frames.json';
import ephemeras from '../../../public/warframe_data/ephemeras.json';
import helmets from '../../../public/warframe_data/helmets.json';
import skins from '../../../public/warframe_data/skins.json';
import colorPickers from '../../../public/warframe_data/colorPickers.json';
import chestAttachments from '../../../public/warframe_data/chestAttachments.json';
import armAttachments from '../../../public/warframe_data/armAttachments.json';
import legAttachments from '../../../public/warframe_data/legAttachments.json';
import syandanas from '../../../public/warframe_data/syandanas.json';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

const request = supertest(app);

describe('Test warframe routes', () => {
  setupTests();

  const apiUrl = '/api/data';

  test('frames route should return valid frames json data', async (done) => {
    const res = await request.get(`${apiUrl}/frames`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(frames);

    done();
  });

  test('ephemeras route should return valid ephemeras json data', async (done) => {
    const res = await request.get(`${apiUrl}/ephemeras`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(ephemeras);

    done();
  });

  test('helmets route should return valid helmets json data', async (done) => {
    const res = await request.get(`${apiUrl}/helmets`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(helmets);

    done();
  });

  test('skins route should return valid skins json data', async (done) => {
    const res = await request.get(`${apiUrl}/skins`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(skins);

    done();
  });

  test('colorPickers route should return valid colorPickers json data', async (done) => {
    const res = await request.get(`${apiUrl}/colorPickers`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(colorPickers);

    done();
  });

  test('chestAttachments route should return valid chestAttachments json data', async (done) => {
    const res = await request.get(`${apiUrl}/chestAttachments`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(chestAttachments);

    done();
  });

  test('armAttachments route should return valid armAttachments json data', async (done) => {
    const res = await request.get(`${apiUrl}/armAttachments`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(armAttachments);

    done();
  });

  test('legAttachments route should return valid legAttachments json data', async (done) => {
    const res = await request.get(`${apiUrl}/legAttachments`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(legAttachments);

    done();
  });

  test('syandanas route should return valid syandanas json data', async (done) => {
    const res = await request.get(`${apiUrl}/syandanas`);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(syandanas);

    done();
  });
});
