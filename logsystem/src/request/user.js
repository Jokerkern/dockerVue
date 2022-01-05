import { get} from './http'

export const Query = (p) => get('/v1/todo/', p)

export const Total = (p) => get('/v1/todo/total', p)

