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

  public async getParticipantsByHeadquarterIdAndEntityId({ params, response }) {
    try {
      const cosa = scripts.getParticipantsByHeadquarterIdAndEntityId(
        params.entityId,
        params.headquarterId
      )
      console.log(cosa)
      const entities = await Database.rawQuery(
        scripts.getParticipantsByHeadquarterIdAndEntityId(params.entityId, params.headquarterId)
      )
      response.status(200).json(this.getResponseOk(entities))
    } catch (error) {
      response.status(500).json(this.getResponseKo(error))
    }
  }
}
