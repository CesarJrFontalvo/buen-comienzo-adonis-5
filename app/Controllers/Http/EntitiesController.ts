// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
const { scripts } = require('./../../../database/factories/properties')

export default class EntitiesController {
  public getResponseOk(entities) {
    return {
      code: 0,
      message: 'OK',
      data: entities.rows,
    }
  }

  public getResponseKo(error) {
    return {
      code: -1,
      message: '[' + error.severity + ' - ' + error.code + ']: ' + error.message,
      data: [],
    }
  }

  public async getEntities({ response }) {
    try {
      const entities = await Database.rawQuery(scripts.getEntities)
      response.status(200).json(this.getResponseOk(entities))
    } catch (error) {
      response.status(500).json(this.getResponseKo(error))
    }
  }

  public async getEntity({ params, response }) {
    try {
      const entities = await Database.rawQuery(scripts.getEntity(params.entityId))
      response.status(200).json(this.getResponseOk(entities))
    } catch (error) {
      response.status(500).json(this.getResponseKo(error))
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
}
