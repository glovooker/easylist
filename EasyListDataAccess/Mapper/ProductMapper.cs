using DTOs;
using EasyListDataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.Mapper
{
    public class ProductMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var product = new Product()
            {
                Id = (int)row["ID_PRODUCTO"],
                name = (string)row["NOMBRE"]
            };
            return product;
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

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var product = (Product)entity;

            sqlOperation.ProcedureName = "CRE_PRODUCTO_PR";
            sqlOperation.AddVarcharParam("P_NOMBRE", product.name);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var product = (Product)entity;

            sqlOperation.ProcedureName = "DEL_PRODUCTO_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", product.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_ALL_PRODUCTOS_PR";

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_PRODUCTO_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", id);
            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
