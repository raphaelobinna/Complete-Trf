import { ReqConfig, Service } from 'types/api'

function databaseService({ api }: Service) {
  type DBDataFormat = {
    user: string
    password: string
    hostname: string
    port: string
    database: string
    id: string
  }
  const importMySql = async (data: DBDataFormat, reqConfig?: ReqConfig) => {
    const result = api.post(`/mysql-import`, data, {
      ...reqConfig,
    })
    return result
  }

  const exportMySql = async (data: DBDataFormat, reqConfig?: ReqConfig) => {
    const result = api.post(`/mysql-export`, data, {
      ...reqConfig,
    })
    return result
  }

  const importPSql = async (data: DBDataFormat, reqConfig?: ReqConfig) => {
    const result = api.post(`/psql-import`, data, {
      ...reqConfig,
    })
    return result
  }

  const exportPSql = async (data: DBDataFormat, reqConfig?: ReqConfig) => {
    const result = api.post(`/psql-export`, data, {
      ...reqConfig,
    })
    return result
  }

  return Object.freeze({
    importMySql,
    exportMySql,
    importPSql,
    exportPSql,
  })
}

export default databaseService
