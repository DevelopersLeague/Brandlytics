import 'reflect-metadata';
import { knexInstance } from '../../config/knex';
import { UserRepository } from './UserRepository';

function getRandomString(length: number) {
  const randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

describe('UserRepository', () => {
  const userRepo = new UserRepository(knexInstance);

  beforeAll(async () => {
    await knexInstance.migrate.latest();
  });

  afterAll(async () => {
    await knexInstance.migrate.down();
  });

  describe('UserRepository.create', () => {
    it('should create new user with correct fields', async () => {
      const username = getRandomString(10);
      const user = await userRepo.create({
        firstname: 'aniket',
        lastname: 'more',
        username: username,
        password: 'password',
      });
      expect(typeof user.id).toBe('number');
      expect(user.firstname).toBe('aniket');
      expect(user.lastname).toBe('more');
      expect(user.username).toBe(username);
      expect(user.password).toBe('password');
      expect(user.isDeleted).toBe(false);
      expect(user.createdAt instanceof Date).toBe(true);
      expect(user.updatedAt instanceof Date).toBe(true);
    });
  });

  describe('findOneById', () => {
    //eslint-disable-next-line
    let ids: number[] = [];

    beforeAll(async () => {
      const username1 = getRandomString(10);
      const username2 = getRandomString(10);

      const localIds1 = await knexInstance('users').insert({
        firstname: 'aniket1',
        lastname: 'more',
        username: username1,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      const localIds2 = await knexInstance('users').insert({
        firstname: 'aniket2',
        lastname: 'more',
        username: username2,
        password: 'password',
        is_deleted: true,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      ids.push(localIds1[0]);
      ids.push(localIds2[0]);
    });

    afterAll(async () => {
      await knexInstance('users').where({ id: ids[0] }).delete();
      await knexInstance('users').where({ id: ids[1] }).delete();
    });

    it('should find user by id', async () => {
      const user = await userRepo.findOneById(ids[0]);
      expect(user).not.toBe(null);
      if (user) {
        expect(user.id).toBe(ids[0]);
        expect(user.firstname).toBe('aniket1');
      }
    });

    it('should return null when no user found', async () => {
      const user = await userRepo.findOneById(ids[0] + 10);
      expect(user).toBe(null);
    });

    it('should return null when user is deleted', async () => {
      const user = await userRepo.findOneById(ids[1]);
      expect(user).toBe(null);
    });
  });

  describe('findOneByUsername', () => {
    //eslint-disable-next-line
    let usernames: string[] = [];
    //eslint-disable-next-line
    let ids: number[] = [];

    beforeAll(async () => {
      const username1 = getRandomString(10);
      const username2 = getRandomString(10);
      usernames.push(username1);
      usernames.push(username2);

      const localIds1 = await knexInstance('users').insert({
        firstname: 'aniket1',
        lastname: 'more',
        username: username1,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      const localIds2 = await knexInstance('users').insert({
        firstname: 'aniket2',
        lastname: 'more',
        username: username2,
        password: 'password',
        is_deleted: true,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      ids.push(localIds1[0]);
      ids.push(localIds2[0]);
    });

    afterAll(async () => {
      await knexInstance('users').where({ id: ids[0] }).delete();
      await knexInstance('users').where({ id: ids[1] }).delete();
    });

    it('should find user by username', async () => {
      const user = await userRepo.findOneByUsername(usernames[0]);
      expect(user).not.toBe(null);
      if (user) {
        expect(user.username).toBe(usernames[0]);
        expect(user.firstname).toBe('aniket1');
      }
    });

    it('should return null when no user found', async () => {
      const user = await userRepo.findOneByUsername(usernames[0] + 'a');
      expect(user).toBe(null);
    });

    it('should return null when user is deleted', async () => {
      const user = await userRepo.findOneByUsername(usernames[1]);
      expect(user).toBe(null);
    });
  });

  /*
  it('should delete user', async () => {
    const username = getRandomString(10);
    const ids = await knexInstance('users').insert({
      firstname: 'aniket',
      lastname: 'more',
      username: username,
      password: 'password',
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    const user = await userRepo.delete(ids[0]);
    expect(user.id).toBe(ids[0]);
    expect(user.isDeleted).toBe(true);
  });
  */

});
