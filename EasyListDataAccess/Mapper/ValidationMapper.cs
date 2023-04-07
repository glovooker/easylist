using DTOs;
using EasyListDataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.Mapper
{
    public class ValidationMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var validation = new Validation
            {
                Id = (int)row["id"],
                userId = (int)row["user_id"],
                validationType = (Validation.ValidationType)row["validation_type"],
                validationCode = (string)row["validation_code"],
                validationDateCreation = (DateTime)row["validation_date_creation"],
                validationDateExpired = (DateTime)row["validation_date_expired"],
                validationCount = (int)row["validation_count"]

            };

            return validation;
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

            var validation = (Validation)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "CRE_VALIDATION_PR";

            sqlOperation.AddIntParam("USER_ID", validation.userId);
            sqlOperation.AddIntParam("VALIDATION_TYPE", (int)validation.validationType);
            sqlOperation.AddVarcharParam("VALIDATION_CODE", validation.validationCode);
            sqlOperation.AddDateTimeParam("VALIDATION_DATE_CREATION", validation.validationDateCreation);
            sqlOperation.AddDateTimeParam("VALIDATION_DATE_EXPIRED", validation.validationDateExpired);
            sqlOperation.AddIntParam("VALIDATION_COUNT", validation.validationCount);

            return sqlOperation;



        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
