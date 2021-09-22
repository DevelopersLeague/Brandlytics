import 'reflect-metadata';
import { knexInstance } from '../../config/knex';
import { IUser } from '../../domain/interfaces';
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

function sleep(ms: number): Promise<void> {
  //eslint-disable-next-line
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, ms);
  });
}

describe('UserRepository', () => {
  const userRepo = new UserRepository(knexInstance);

  beforeAll(async () => {
    await knexInstance.migrate.latest();
  });

  afterAll(async () => {
    await knexInstance.migrate.down();
  });

  describe('create', () => {
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

  describe('delete', () => {
    //eslint-disable-next-line
    let ids: number[] = [];

    beforeAll(async () => {
      const username1 = getRandomString(10);
      const username2 = getRandomString(10);
      const username3 = getRandomString(10);

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

      const localIds3 = await knexInstance('users').insert({
        firstname: 'aniket1',
        lastname: 'more',
        username: username3,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      ids.push(localIds1[0]);
      ids.push(localIds2[0]);
      ids.push(localIds3[0]);
    });

    afterAll(async () => {
      await knexInstance('users').where({ id: ids[0] }).delete();
      await knexInstance('users').where({ id: ids[1] }).delete();
    });

    it('should delete user', async () => {
      const user = await userRepo.delete(ids[0]);
      expect(user).not.toBe(null);
      if (user) {
        expect(user.id).toBe(ids[0]);
        expect(user.firstname).toBe('aniket1');
        expect(user.isDeleted).toBe(true);
      }
    });

    it('should return null when user does not exist', async () => {
      const user = await userRepo.delete(ids[0] + 10);
      expect(user).toBe(null);
    });

    it('should return null when user is deleted', async () => {
      const user = await userRepo.delete(ids[1]);
      expect(user).toBe(null);
    });

    it('should update updatedAt after deleting', async () => {
      const oldUsers = await knexInstance('users').where({ id: ids[2] });
      const user = await userRepo.delete(ids[2]);
      expect(user).not.toBe(null);
      if (user) {
        expect(user.updatedAt > new Date(oldUsers[0].updated_at));
      }
    });
  });

  describe('findAll', () => {
    //eslint-disable-next-line
    let ids: number[] = [];

    beforeAll(async () => {
      const username1 = getRandomString(10);
      const username2 = getRandomString(10);
      const username3 = getRandomString(10);

      const localIds1 = await knexInstance('users').insert({
        firstname: 'aniket1',
        lastname: 'more',
        username: username1,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      await sleep(250);
      const localIds2 = await knexInstance('users').insert({
        firstname: 'aniket2',
        lastname: 'more',
        username: username2,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      const localIds3 = await knexInstance('users').insert({
        firstname: 'aniket3',
        lastname: 'more',
        username: username3,
        password: 'password',
        is_deleted: true,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      ids.push(localIds1[0]);
      ids.push(localIds2[0]);
      ids.push(localIds3[0]);
    });

    afterAll(async () => {
      await knexInstance('users').where({ id: ids[0] }).delete();
      await knexInstance('users').where({ id: ids[1] }).delete();
      await knexInstance('users').where({ id: ids[2] }).delete();
    });

    it('should find all users', async () => {
      const users = await userRepo.findAll();
      const userids = users.map((user) => user.id);
      expect(userids.includes(ids[0])).toBe(true);
      expect(userids.includes(ids[1])).toBe(true);
    });

    it('should not return user which are deleted', async () => {
      const users = await userRepo.findAll();
      const userids = users.map((user) => user.id);
      expect(userids.includes(ids[2])).toBe(false);
    });

    it('should user by updatedAt descending', async () => {
      const users = await userRepo.findAll();
      const userids = users.map((user) => user.id);
      expect(userids.indexOf(ids[0]) > userids.indexOf(ids[1])).toBe(true);
    });
  });

  describe('save', () => {
    //eslint-disable-next-line
    let users: IUser[] = [];

    beforeAll(async () => {
      const username1 = getRandomString(10);

      const localIds1 = await knexInstance('users').insert({
        firstname: 'aniket1',
        lastname: 'more',
        username: username1,
        password: 'password',
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      const returnUsers = await knexInstance('users').where({
        id: localIds1[0],
      });
      const returnUser = returnUsers[0];
      users.push({
        id: returnUser.id,
        firstname: returnUser.firstname,
        lastname: returnUser.lastname,
        username: returnUser.username,
        password: returnUser.password,
        isDeleted: new Boolean(returnUser.is_deleted).valueOf(),
        createdAt: new Date(returnUser.created_at),
        updatedAt: new Date(returnUser.updated_at),
      });
    });

    afterAll(async () => {
      await knexInstance('users').where({ id: users[0].id }).delete();
    });

    it('should update user details', async () => {
      const newUsername = getRandomString(10);
      const user = users[0];
      user.firstname = 'new_firstname';
      user.lastname = 'new_lastname';
      user.password = 'new_password';
      user.username = newUsername;
      user.isDeleted = true;
      const returnUser = await userRepo.save(user);
      expect(returnUser.firstname).toBe('new_firstname');
      expect(returnUser.lastname).toBe('new_lastname');
      expect(returnUser.username).toBe(newUsername);
      expect(returnUser.password).toBe('new_password');
      expect(returnUser.isDeleted).toBe(true);
      expect(user.updatedAt <= returnUser.updatedAt).toBe(true);
    });
  });
});
