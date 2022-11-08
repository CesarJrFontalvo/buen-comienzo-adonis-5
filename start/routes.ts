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

Route.group(() => {
  Route.get('/', async () => {
    return { greeting: 'Hello world in JSON' }
  })
  Route.get('list/entities', 'EntitiesController.showEntities')
  Route.get('list/entities/:id/headquarters', 'EntitiesController.showListHeadquarterById')
  Route.get('detail/headquarters/:id/participants', 'EntitiesController.showParticipantDetailById')
  Route.get('detail/headquarters/:id', 'EntitiesController.showDetailHeadquarterById')
}).prefix('/api/v1')
