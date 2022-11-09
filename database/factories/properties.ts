module.exports.scripts = {
  getEntities:
    "select  id,modelo->>'RAZON_SOCIAL' as razon_social, modelo->>'NUMERO_DOCUMENTO' as numero_documento from  nbc_entidades order by modelo->>'RAZON_SOCIAL'",

  getEntity: (entityId) => {
    return `
    select  modelo->>'ESTADO' as estado,
            modelo->>'TELEFONO' as telefono,
            modelo->>'RAZON_SOCIAL' as razon_social,
            modelo->>'NUMERO_DOCUMENTO' as numero_documento,
            modelo->'UBICACION'->>'DIRECCION' as direccion,
            modelo->'UBICACION'->>'BARRIO' as barrio,
            modelo->'UBICACION'->>'COMUNA' as comuna
    from    nbc_entidades
    where   id = ${entityId}
  `
  },

  getHeadquartersByEntityId: (entityId) => {
    return `
    select  nbc_sedes_contrato.id,
            nbc_sedes_contrato.modelo->>'DESCRIPCION_SEDE' as descripcion_sede
    from    nbc_sedes_contrato,
            nbc_contratos
    where   nbc_contratos.id = (nbc_sedes_contrato.modelo->>'ID_CONTRATO')::integer
    and     (nbc_contratos.modelo->>'PRESTADOR_ID')::integer = ${entityId}
    order by nbc_sedes_contrato.modelo->>'DESCRIPCION_SEDE'
  `
  },

  getHeadquarterDetailByIdAndEntityId: (entityId, headquarterId) => {
    return `
    select  nbc_sedes.modelo->>'NOMBRE_SEDE' as nombre_sede,
            nbc_sedes.modelo->'UBICACION'->>'BARRIO' as id_barrio_sede,
            nbc_sedes.modelo->'UBICACION'->>'NOMBRE_BARRIO' as barrio_sede,
            nbc_sedes.modelo->'UBICACION'->>'DIRECCION' as direccion_sede,
            nbc_sedes.modelo->>'TELEFONO' as telefono_sede,
            nbc_sedes.modelo->'UBICACION'->>'COMUNA' as id_comuna_sede,
            nbc_sedes.modelo->'UBICACION'->>'NOMBRE_COMUNA' as nombre_comuna_corregimiento,
            nbc_modalidades.modelo->>'NOMBRE_MODALIDAD' as nombre_modalidad,
            nbc_sedes_contrato.modelo->>'CUPOS_ASIGNADOS' as cupos_asignados,
            nbc_sedes_contrato.modelo->>'MATRICULADOS' as matriculados
    from    nbc_sedes,
            nbc_sedes_contrato,
            nbc_contratos,
            nbc_modalidades
    where   nbc_sedes_contrato.id = nbc_sedes.id
    and     nbc_contratos.id   = (nbc_sedes_contrato.modelo->>'ID_CONTRATO')::integer
    and     nbc_modalidades.id = (nbc_contratos.modelo->>'MODALIDAD_ID')::integer
    and     nbc_sedes.id       = ${headquarterId}
    and     (nbc_contratos.modelo->>'PRESTADOR_ID')::integer = ${entityId}
  `
  },

  getParticipantsByHeadquarterIdAndEntityId: (entityId, headquarterId) => {
    return `
    with    my_parameters as (
        select  ${entityId} as id_entidad,
                ${headquarterId} as id_sede
    ),
    base_data_1 as (
        select  nbc_sedes.id as id_sede,
                nbc_sedes.modelo->>'NOMBRE_SEDE' as nombre_sede,
                nbc_sedes.modelo->'UBICACION'->>'BARRIO' as id_barrio_sede,
                nbc_sedes.modelo->'UBICACION'->>'NOMBRE_BARRIO' as barrio_sede,
                nbc_sedes.modelo->'UBICACION'->>'DIRECCION' as direccion_sede,
                nbc_sedes.modelo->>'TELEFONO' as telefono_sede,
                nbc_sedes.modelo->'UBICACION'->>'COMUNA' as id_comuna_sede,
                nbc_sedes.modelo->'UBICACION'->>'NOMBRE_COMUNA' as nombre_comuna_corregimiento,
                nbc_grupos_sede.modelo->'PARTICIPANTE_GRUPO' as participantes_grupo,
                nbc_grupos_sede.id as id_grupo,
                nbc_grupos_sede.modelo->>'NOMBRE_GRUPO' as nombre_grupo,
                nbc_contratos.id as id_contrato,
                nbc_contratos.modelo->>'NUMERO_CONTRATO' as numero_contrato,
                nbc_contratos.modelo->>'PRESTADOR_ID' as id_prestador,
                nbc_modalidades.modelo->>'NOMBRE_MODALIDAD' as nombre_modalidad,
                nbc_entidades.modelo->>'RAZON_SOCIAL' as prestador_servicio
        from    nbc_sedes,
                nbc_sedes_contrato,
                nbc_contratos,
                nbc_modalidades,
                nbc_entidades,
                nbc_grupos_sede,
                my_parameters
        where   nbc_sedes_contrato.id = nbc_sedes.id
        and     nbc_contratos.id   = (nbc_sedes_contrato.modelo->>'ID_CONTRATO')::integer
        and     nbc_modalidades.id = (nbc_contratos.modelo->>'MODALIDAD_ID')::integer
        and     nbc_entidades.id   = (nbc_contratos.modelo->>'PRESTADOR_ID')::integer
        and     nbc_contratos.id   = (nbc_grupos_sede.modelo->>'ID_CONTRATO')::integer
        and     nbc_sedes.id       = (nbc_grupos_sede.modelo->>'ID_SEDE')::integer
        and     nbc_sedes.id       = my_parameters.id_sede
        and     (nbc_contratos.modelo->>'PRESTADOR_ID')::integer = my_parameters.id_entidad
    ),
    base_data_2 as (
        select  base_data_1.*,
                jsonb_array_elements_text(participantes_grupo)::integer as id_persona
        from    base_data_1
    ),
    base_data_3 as (
        select  base_data_2.*,
                np.modelo->'INFORMACION_BASICA'->>'IDENTIFICACION' as identificacion,
                np.modelo->'INFORMACION_BASICA'->>'PRIMER_NOMBRE' as primer_nombre,
                np.modelo->'INFORMACION_BASICA'->>'SEGUNDO_NOMBRE' as segundo_nombre,
                np.modelo->'INFORMACION_BASICA'->>'PRIMER_APELLIDO' as primer_apellido,
                np.modelo->'INFORMACION_BASICA'->>'SEGUNDO_APELLIDO' as segundo_apellido,
                np.modelo->'INFORMACION_DOMICILIO'->>'CELULAR' as celular,
                np.modelo->'INFORMACION_DOMICILIO'->>'TELEFONO_FIJO' as telefono,
                np.modelo->'INFORMACION_BASICA'->>'FECHA_NACIMIENTO' as fecha_nacimiento
        from    base_data_2,
                nbc_participantes np
        where   np.id = base_data_2.id_persona
    ),
    base_data_4 as (
        select  base_data_3.*,
                (   select  current_hist->>'FECHA_MATRICULA' as fecha_matricula
                    from(
                            select  jsonb_array_elements(modelo->'HISTORICO_GRUPO') as current_hist
                            from    nbc_participantes np1
                    where   np1.id = base_data_3.id_persona
                    ) i1
                    where   trim(current_hist->>'FECHA_RETIRO') = ''
                    or      current_hist->>'FECHA_RETIRO' is null
                ) as fecha_matricula
        from    base_data_3
    )
    select  id_sede,
            nombre_sede,
            id_barrio_sede,
            barrio_sede,
            direccion_sede,
            telefono_sede,
            id_comuna_sede,
            nombre_comuna_corregimiento,
            id_contrato,
            numero_contrato,
            id_prestador,
            nombre_modalidad,
            prestador_servicio,
            id_grupo,
            nombre_grupo,
            id_persona,
            identificacion,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            celular,
            telefono,
            fecha_nacimiento,
            fecha_matricula
    from    base_data_4
    order by id_grupo
  `
  },
}
