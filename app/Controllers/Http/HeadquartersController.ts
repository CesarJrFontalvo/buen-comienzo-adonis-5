import Database from '@ioc:Adonis/Lucid/Database'
const { scripts } = require('./../../../database/factories/properties')

export default class Headquarters {
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

  public async getHeadquartersByEntityId({ params, response }) {
    try {
      const entities = await Database.rawQuery(scripts.getHeadquartersByEntityId(params.entityId))
      response.status(200).json(this.getResponseOk(entities))
    } catch (error) {
      response.status(500).json(this.getResponseKo(error))
    }
  }

  public async getHeadquarterDetailByIdAndEntityId({ params, response }) {
    try {
      const entities = await Database.rawQuery(
        scripts.getHeadquarterDetailByIdAndEntityId(params.entityId, params.headquarterId)
      )
      response.status(200).json(this.getResponseOk(entities))
    } catch (error) {
      response.status(500).json(this.getResponseKo(error))
    }
  }
}
