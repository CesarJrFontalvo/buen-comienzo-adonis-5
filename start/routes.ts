/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  /**
   * @swagger
   * /list/entities:
   *   get:
   *     summary: Retorna una lista de entidades!
   *     responses:
   *       200:
   *         description: Esta ruta retorna una lista de entidades ordenadas alfabeticamente.
   */
  Route.get('list/entities', 'EntitiesController.showEntities')
  /**
   * @swagger
   * /list/entities/{id}/headquarters:
   *   get:
   *     summary: Retorna una lista de entidades!
   *     parameters:
   *      - name: id
   *        in: path
   *        description: ID of entity to return
   *        required: true
   *     responses:
   *       200:
   *         description: Esta ruta retorna una lista de entidades ordenadas alfabeticamente.
   */
  Route.get('list/entities/:id/headquarters', 'EntitiesController.showListHeadquarterById')
  /**
   * @swagger
   * /detail/headquarters/{id}/participants:
   *   get:
   *     summary: Retorna una lista de entidades!
   *     parameters:
   *      - name: id
   *        in: path
   *        description: ID of participants to return
   *        required: true
   *     responses:
   *       200:
   *         description: Esta ruta retorna una lista de entidades ordenadas alfabeticamente.
   */
  Route.get('detail/headquarters/:id/participants', 'EntitiesController.showParticipantDetailById')
  /**
   * @swagger
   * /detail/headquarters/{id}:
   *   get:
   *     summary: Retorna una lista de entidades!
   *     parameters:
   *      - name: id
   *        in: path
   *        description: ID of participants to return
   *        required: true
   *     responses:
   *       200:
   *         description: Esta ruta retorna una lista de entidades ordenadas alfabeticamente.
   */
  Route.get('detail/headquarters/:id', 'EntitiesController.showDetailHeadquarterById')
}).prefix('/api/v1')
