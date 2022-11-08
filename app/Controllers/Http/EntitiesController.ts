// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
const { scripts } = require('./../../../database/factories/properties')

export default class EntitiesController {
  public async showEntities({ response }) {
    try {
      const entities = await Database.rawQuery(scripts.getEntities)
      response.status(200).json({
        code: 0,
        message: 'ok',
        data: entities.rows,
      })
    } catch (error) {
      response.status(500).json({
        code: -1,
        message: 'Error de conexión a la base de datos !!! ',
        data: [],
      })
    }
  }

  public async showListHeadquarterById({ params, response }) {
    try {
      const entities = await Database.rawQuery(scripts.getListHeadquarterById(params.id))
      response.status(200).json({
        code: 0,
        message: 'ok',
        data: entities.rows,
      })
    } catch (error) {
      response.status(500).json({
        code: -1,
        message: 'Error de conexión a la base de datos !!! ',
        data: [],
      })
    }
  }

  public async showParticipantDetailById({ params, response }) {
    try {
      const entities = await Database.rawQuery(scripts.showParticipantDetailById(params.id))
      response.status(200).json({
        code: 0,
        message: 'ok',
        data: entities.rows,
      })
    } catch (error) {
      response.status(500).json({
        code: -1,
        message: 'Error de conexión a la base de datos !!! ',
        data: [],
      })
    }
  }

  public async showDetailHeadquarterById({ params, response }) {
    try {
      const entities = await Database.rawQuery(scripts.showDetailHeadquarterById(params.id))
      response.status(200).json({
        code: 0,
        message: 'ok',
        data: entities.rows,
      })
    } catch (error) {
      response.status(500).json({
        code: -1,
        message: 'Error de conexión a la base de datos !!! ',
        data: [],
      })
    }
  }
}
