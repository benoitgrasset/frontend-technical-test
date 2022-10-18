import { rest } from 'msw';
import { baseUrl } from '../../services';
import { mockUsers } from '../user';

export const handlers = [
  rest.get(baseUrl + 'users', (req, res, ctx) => res(ctx.json(mockUsers))),
];
