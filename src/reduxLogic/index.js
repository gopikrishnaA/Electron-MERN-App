import authLogic from './authLogic'
import jokesLogic from './jokesLogic'
import commentsLogic from './commentsLogic'
export default [
  ...authLogic,
  ...jokesLogic,
   ...commentsLogic]
