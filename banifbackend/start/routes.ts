/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rota pública boas-vindas / autenticação
router.get('/hello', async () => {
  return {
    message: 'API AdonisJS com Autenticação por Access Tokens',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout (protegida)',
        me: 'GET /auth/me (protegida)',
        tokens: 'GET /auth/tokens (protegida)',
        createToken: 'POST /auth/tokens (protegida)'
      },
      protected: {
        profile: 'GET /profile (protegida)',
        dashboard: 'GET /dashboard (protegida)',
        posts: 'GET /posts (protegida)',
        createPost: 'POST /posts (protegida)'
      },
    },
  }
})

// Rotas de autenticação (públicas)
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/addressregister', '#controllers/auth_controller.registeraddress')
  router.post('/accountregister', '#controllers/auth_controller.accountregister')
  router.post('/transfer', '#controllers/transferencia_controller.store').use(middleware.auth())
  router.get('/list', '#controllers/user_controller.index').use(middleware.auth())
  router.get('/liststatement', '#controllers/statement_controller.index').use(middleware.auth())
  router.get('/showstatement', '#controllers/statement_controller.show').use(middleware.auth())

  router.post('/login', '#controllers/auth_controller.login')
  // Rotas protegidas de autenticação
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
  router.get('/tokens', '#controllers/auth_controller.tokens').use(middleware.auth())
  router.post('/tokens', '#controllers/auth_controller.createToken').use(middleware.auth())

  // 🔹 Rotas de investimento
  router.post('/invest', '#controllers/investment_controller.store').use(middleware.auth())
  router.post('/invest/withdraw', '#controllers/investment_controller.withdraw').use(middleware.auth())
  router.get('/investments', '#controllers/investment_controller.index').use(middleware.auth())
}).prefix('/auth')

router.get('/conta', '#controllers/conta_controller.show').use(middleware.auth())

