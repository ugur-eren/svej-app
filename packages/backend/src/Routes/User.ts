import {Password} from 'server-side';
import express from 'express';
import {Config, ErrorCodes, HTTPStatus, Zod} from 'common';
import {Prisma, PrismaIncludes, PrismaTypes} from '../Services';
import {onlyAuthorized} from '../Middlewares';

const Router = express.Router();

type Author = PrismaTypes.UserGetPayload<{include: ReturnType<typeof PrismaIncludes.Author>}>;

const extendUser = (user: Author, userId: string) => {
  return {
    ...user,
    isFollowing: user.followers.some((follower) => follower.id === userId),
  };
};

Router.get('/search', onlyAuthorized, async (req, res) => {
  const {query} = req.query;

  if (typeof query !== 'string') {
    res.status(HTTPStatus.BadRequest).send({code: ErrorCodes.FillAllFields});
    return;
  }

  if (!query.trim()) {
    res.status(HTTPStatus.OK).send([]);
    return;
  }

  const users = await Prisma.user.findMany({
    where: {
      OR: [{username: {contains: query.trim()}}, {fullname: {contains: query.trim()}}],
    },
    orderBy: {followers: {_count: 'desc'}},
    take: 20,
    include: PrismaIncludes.Author(res.locals.user.id),
  });

  const extendedUsers = users.map((user) => extendUser(user, res.locals.user.id));

  res.status(HTTPStatus.OK).send(extendedUsers);
});

Router.get('/me', onlyAuthorized, async (req, res) => {
  const user = await Prisma.user.findUnique({
    where: {id: res.locals.user.id},
    include: PrismaIncludes.User(res.locals.user.id),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const extendedUser = extendUser(user!, res.locals.user.id);

  res.status(HTTPStatus.OK).send(extendedUser);
});

Router.get('/username/:username', onlyAuthorized, async (req, res) => {
  const {username} = req.params;

  const user = await Prisma.user.findUnique({
    where: {username},
    include: PrismaIncludes.User(res.locals.user.id),
  });

  if (!user) {
    res.status(HTTPStatus.NotFound).send({code: ErrorCodes.UserNotFound});
    return;
  }

  const extendedUser = extendUser(user, res.locals.user.id);

  res.status(HTTPStatus.OK).send(extendedUser);
});

Router.get('/:id', onlyAuthorized, async (req, res) => {
  const {id} = req.params;

  const user = await Prisma.user.findUnique({
    where: {id},
    include: PrismaIncludes.User(res.locals.user.id),
  });

  if (!user) {
    res.status(HTTPStatus.NotFound).send({code: ErrorCodes.UserNotFound});
    return;
  }

  const extendedUser = extendUser(user, res.locals.user.id);

  res.status(HTTPStatus.OK).send(extendedUser);
});

Router.get('/:id/relations/:type(follows|followers)', onlyAuthorized, async (req, res) => {
  const {id, type} = req.params;

  if (type !== 'follows' && type !== 'followers') {
    res.status(HTTPStatus.BadRequest).send({code: ErrorCodes.FillAllFields});
    return;
  }

  const page = parseInt(req.query.page as string, 10) || 1;

  const user = await Prisma.user.findUnique({
    where: {id},
    select: {
      [type]: {
        include: PrismaIncludes.Author(res.locals.user.id),
        take: Config.relationsPerPage,
        skip: (page - 1) * Config.relationsPerPage,
        orderBy: {followers: {_count: 'desc'}},
      },
    },
  });

  if (!user) {
    res.status(HTTPStatus.NotFound).send({code: ErrorCodes.UserNotFound});
    return;
  }

  const relations = user[type].map((rel) => extendUser(rel as Author, res.locals.user.id));

  res.status(HTTPStatus.OK).send(relations);
});

Router.put('/', async (req, res) => {
  const body = Zod.User.Create.safeParse(req.body);

  if (!body.success) {
    res.status(HTTPStatus.BadRequest).send({code: ErrorCodes.FillAllFields, error: body.error});
    return;
  }

  const usernameExists = await Prisma.user.findUnique({where: {username: body.data.username}});
  if (usernameExists) {
    res.status(HTTPStatus.BadRequest).send({code: ErrorCodes.UsernameAlreadyExists});
    return;
  }

  const emailExists = await Prisma.user.findUnique({where: {email: body.data.email}});
  if (emailExists) {
    res.status(HTTPStatus.BadRequest).send({code: ErrorCodes.EmailAlreadyExists});
    return;
  }

  const user = await Prisma.user.create({
    data: {
      ...body.data,
      password: await Password.hash(body.data.password),
    },
  });

  res.status(HTTPStatus.OK).send(user);
});

export default Router;
