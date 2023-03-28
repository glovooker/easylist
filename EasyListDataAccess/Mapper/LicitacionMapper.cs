using DTOs;
using EasyListDataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.Mapper
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
                estado = (Licitacion.Status)Enum.Parse(typeof(Licitacion.Status), (string)row["ESTADO"]),
                fechaMaxOferta = (DateTime)row["FECHAMAXOFERTA"],
                fechaMaxEntrega = (DateTime)row["FECHAMAXENTREGA"],
                presupuesto = Convert.ToSingle(row["PRESUPUESTO"]),
                codigoQr = (string)row["CODIGOQR"],
                automatica = (bool)row["AUTOMATICA"],
                idAnalista = (int)row["ID_ANALISTA"],
                idOferta = row["ID_OFERTA"] == DBNull.Value ? 0 : (int)row["ID_OFERTA"]
            };
            return licitacion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newUser = BuildObject(row);
                lstResult.Add(newUser);
            }

            return lstResult;
        }

        protected int GetIntValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && (val is int || val is decimal))
                return (int)dic[attName];

            return -1;
        }

        protected string GetStringValue(Dictionary<string, object> dic, string attName)
        {
            if (dic.ContainsKey(attName) && dic[attName] is string)
                return (string)dic[attName];

            return null;
        }

        protected DateTime? GetDateTimeValue(Dictionary<string, object> dic, string attName)
        {
            if (dic.ContainsKey(attName) && dic[attName] is DateTime)
            {
                return (DateTime)dic[attName];
            }

            return null;
        }

        //SQL ---

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var licitacion = (Licitacion)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "CRE_LICITACION_PR";
            //(Identity) sqlOperation.AddIntParam("P_ID_LICITACION", licitacion.idLicitacion);
            sqlOperation.AddVarcharParam("P_TITULO", licitacion.titulo);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", licitacion.descripcion);
            sqlOperation.AddVarcharParam("P_ESTADO", licitacion.estado.ToString());
            sqlOperation.AddDateTimeParam("P_FECHAMAXOFERTA", licitacion.fechaMaxOferta);
            sqlOperation.AddDateTimeParam("P_FECHAMAXENTREGA", licitacion.fechaMaxEntrega);
            sqlOperation.AddFloatParam("P_PRESUPUESTO", licitacion.presupuesto);
            sqlOperation.AddVarcharParam("P_CODIGOQR", licitacion.codigoQr);
            sqlOperation.AddBoolParam("P_AUTOMATICA", licitacion.automatica);
            sqlOperation.AddIntParam("P_ID_ANALISTA", licitacion.idAnalista);
            sqlOperation.AddIntParam("P_ID_OFERTA", licitacion.idOferta);


            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var licitacion = (Licitacion)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "UPD_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_LICITACION", licitacion.idLicitacion);
            sqlOperation.AddVarcharParam("P_TITULO", licitacion.titulo);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", licitacion.descripcion);
            sqlOperation.AddVarcharParam("P_ESTADO", licitacion.estado.ToString());
            sqlOperation.AddDateTimeParam("P_FECHAMAXOFERTA", licitacion.fechaMaxOferta);
            sqlOperation.AddDateTimeParam("P_FECHAMAXENTREGA", licitacion.fechaMaxEntrega);
            sqlOperation.AddFloatParam("P_PRESUPUESTO", licitacion.presupuesto);
            sqlOperation.AddVarcharParam("P_CODIGOQR", licitacion.codigoQr);
            sqlOperation.AddBoolParam("P_AUTOMATICA", licitacion.automatica);
            sqlOperation.AddIntParam("P_ID_ANALISTA", licitacion.idAnalista);
            sqlOperation.AddIntParam("P_ID_OFERTA", licitacion.idOferta);


            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "DEL_LICITACION_PR" };

            var licitacion = (Licitacion)entity;

            sqlOperation.AddIntParam("P_ID_LICITACION", licitacion.idLicitacion);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int idLicitacion)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_LICITACION_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_LICITACION", idLicitacion);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_LICITACION_PR" };

            return sqlOperation;
        }

    }

}
