using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess
{
    public class LicitacionMapper : ISqlStatements, IObjectMapper
    {

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var licitacion = new Licitacion()
            {
                idLicitacion = (int)row["ID_LICITACION"],
                titulo = (string)row["TITULO"],
                descripcion = (string)row["DESCRIPCION"],
                estado = (string)row["ESTADO"],
                fechaMaxOferta = (DateTime)row["FECHAMAXOFERTA"],
                fechaMaxEntrega = (DateTime)row["FECHAMAXENTREGA"],
                presupuesto = (float)row["PRESUPUESTO"],
                codigoQr = (string)row["CODIGOQR"],
                automatica = (Boolean)row["AUTOMATICA"]
            };
            return licitacion;
        }
    }

    public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
    {
        var lstResults = new List<BaseEntity>();

        foreach(var row in lstRows)
        {
            var customer = BuildObject(row);
            lstResults.Add(customer);   
        }
        return lstResults;
    }

    public SqlOperation GetCreateStatement(BaseEntity entity)
    {
        var licitacion = (Licitacion)entity;

        var sqlOperation = new SqlOperation();

        sqlOperation.ProcedureName = "CRE_LICITACION_PR";
        sqlOperation.AddIntParam("P_ID_LICITACION", licitacion.idLicitacion);
        sqlOperation.AddVarcharParam("P_TITULO", licitacion.titulo);
        sqlOperation.AddVarcharParam("P_DESCRIPCION", licitacion.descripcion);
        sqlOperation.AddVarcharParam("P_ESTADO", licitacion.estado);
        sqlOperation.AddDateTimeParam("P_FECHAMAXOFERTA", licitacion.fechaMaxOferta);
        sqlOperation.AddDateTimeParam("P_FECHAMAXENTREGA", licitacion.fechaMaxEntrega);
        sqlOperation.AddDoubleParam("P_PRESUPUESTO", licitacion.presupuesto);
        sqlOperation.AddVarcharParam("P_CODIGOQR", licitacion.codigoQr);
        sqlOperation.AddVarcharParam("P_AUTOMATICA", licitacion.automatica);


        return sqlOperation;

    }

}
