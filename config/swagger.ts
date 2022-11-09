import SwaggerConfig from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Buen comienzo API',
        version: '1.0.0',
        description: 'API simple de consultas ',
      },
      servers: [
        {
          url: 'http://localhost:3333/api/v1',
        },
      ],
      tags: [
        {
          name: 'Get',
          description: 'Todas las rutas Get',
        },
      ],
      paths: {
        '/entities': {
          get: {
            tags: ['Get'],
            summary: 'Retorna una lista de entidades!',
            description: 'Esta ruta retorna una lista de entidades ordenadas alfabeticamente.',
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Entity',
                    },
                  },
                },
              },
              '500': {
                description: 'Error de conexión a base de datos !',
              },
            },
          },
        },
        '/entities/{id}/headquarters': {
          get: {
            tags: ['Get'],
            summary: 'Retorna una lista de sedes!',
            description: 'Esta ruta retorna una lista de sedes ordenadas alfabeticamente.',
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'ID of PRESTADOR_ID to return',
                required: 'true',
              },
            ],
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ListHeadquarters',
                    },
                  },
                },
              },
              '500': {
                description: 'Error de conexión a base de datos !',
              },
            },
          },
        },
        '/detail/headquarters/{id}/participants': {
          get: {
            tags: ['Get'],
            summary: 'Retorna una lista de sedes!',
            description: 'Esta ruta retorna una lista de sedes ordenadas alfabeticamente.',
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'ID of id_sede to return',
                required: 'true',
              },
            ],
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/DetailHeadquartersParticipants',
                    },
                  },
                },
              },
              '500': {
                description: 'Error de conexión a base de datos !',
              },
            },
          },
        },
        '/detail/headquarters/{id}': {
          get: {
            tags: ['Get'],
            summary: 'Retorna una lista de sedes!',
            description: 'Esta ruta retorna una lista de sedes ordenadas alfabeticamente.',
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'ID of id_sede to return',
                required: 'true',
              },
            ],
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ListDetailHeadquarters',
                    },
                  },
                },
              },
              '500': {
                description: 'Error de conexión a base de datos !',
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Entity: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 125,
              },
              razon_social: {
                type: 'string',
                example: 'ABRAZAR - CORPORACION',
              },
              numero_documento: {
                type: 'string',
                example: '900204791',
              },
            },
          },
          ListHeadquarters: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 664,
              },
              descripcion_sede: {
                type: 'string',
                example: 'JI BC AURES',
              },
            },
          },
          DetailHeadquartersParticipants: {
            type: 'object',
            properties: {
              id_sede: {
                type: 'integer',
                example: 1717,
              },
              nombre_sede: {
                type: 'string',
                example: 'CI CASA BETANCOURT',
              },
              id_barrio_sede: {
                type: 'string',
                example: '1108',
              },
              barrio_sede: {
                type: 'string',
                example: 'LAURELES',
              },
              direccion_sede: {
                type: 'string',
                example: 'TR 39B Cr 75 39',
              },
              telefono_sede: {
                type: 'string',
                example: '3438154',
              },
              id_comuna_sede: {
                type: 'string',
                example: '11',
              },
              nombre_comuna_corregimiento: {
                type: 'string',
                example: 'LAURELES ESTADIO',
              },
              id_contrato: {
                type: 'integer',
                example: 1299,
              },
              numero_contrato: {
                type: 'string',
                example: '4600089131',
              },
              id_prestador: {
                type: 'string',
                example: '8',
              },
              nombre_modalidad: {
                type: 'string',
                example: 'INSTITUCIONAL 8 HORAS',
              },
              prestador_servicio: {
                type: 'string',
                example: 'FAN - FUNDACION DE ATENCION A LA NIÑEZ',
              },
              id_grupo: {
                type: 'integer',
                example: 48596,
              },
              nombre_grupo: {
                type: 'string',
                example: 'ALTERNANCIA-GRUPO 3',
              },
              id_persona: {
                type: 'integer',
                example: 617467,
              },
              identificacion: {
                type: 'string',
                example: '1020125872',
              },
              primer_nombre: {
                type: 'string',
                example: 'EMILIANO',
              },
              segundo_nombre: {
                type: 'string',
                example: '',
              },
              primer_apellido: {
                type: 'string',
                example: 'AGUILAR',
              },
              segundo_apellido: {
                type: 'string',
                example: 'CORTES',
              },
              celular: {
                type: 'string',
                example: '3102552372',
              },
              telefono: {
                type: 'string',
                example: '',
              },
              fecha_nacimiento: {
                type: 'string',
                example: '2017-06-15',
              },
              fecha_matricula: {
                type: 'string',
                example: '2022-01-19',
              },
            },
          },
          ListDetailHeadquarters: {
            type: 'object',
            properties: {
              nombre_sede: {
                type: 'string',
                example: 'CI CASA BETANCOURT',
              },
              id_barrio_sede: {
                type: 'string',
                example: '1108',
              },
              barrio_sede: {
                type: 'string',
                example: 'LAURELES',
              },
              direccion_sede: {
                type: 'string',
                example: 'TR 39B Cr 75 39',
              },
              telefono_sede: {
                type: 'string',
                example: '3438154',
              },
              id_comuna_sede: {
                type: 'string',
                example: '11',
              },
              nombre_comuna_corregimiento: {
                type: 'string',
                example: 'LAURELES ESTADIO',
              },
              nombre_modalidad: {
                type: 'string',
                example: 'INSTITUCIONAL 8 HORAS',
              },
              cupos_asignados: {
                type: 'string',
                example: '108',
              },
              matriculados: {
                type: 'string',
                example: '105',
              },
            },
          },
        },
      },
    },

    apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],
    basePath: '/',
  },

  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig
