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
                Id = (int)row["ID_VALIDACION"],
                userId = (string)row["ID_USUARIO"],
                validationType = (Validation.ValidationType)Enum.Parse(typeof(Validation.ValidationType), (string)row["TIPOVALIDACION"]),
                validationStatus = (Validation.ValidationStatus)Enum.Parse(typeof(Validation.ValidationStatus), (string)row["ESTADOVALIDACION"]),
                validationCode = (string)row["CODIGOVALIDACION"],
                validationDateCreation = (DateTime)row["FECHACREACION"],
                validationDateExpired = (DateTime)row["FECHAVENCIMIENTO"],
                validationCount = (int)row["INTENTOS"]

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

            sqlOperation.AddVarcharParam("P_USER_ID", validation.userId);
            sqlOperation.AddVarcharParam("P_VALIDATION_TYPE", validation.validationType.ToString());
            sqlOperation.AddVarcharParam("P_VALIDATION_STATUS",validation.validationStatus.ToString());
            sqlOperation.AddVarcharParam("P_VALIDATION_CODE", validation.validationCode);
            sqlOperation.AddDateTimeParam("P_VALIDATION_DATE_CREATION", validation.validationDateCreation);
            sqlOperation.AddDateTimeParam("P_VALIDATION_DATE_EXPIRED", validation.validationDateExpired);
            sqlOperation.AddIntParam("P_VALIDATION_COUNT", validation.validationCount);

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
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_VALIDATION_BY_ID_PR";

            sqlOperation.AddIntParam("P_ID_VALIDATION", id);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
        public SqlOperation GetUpdatePhoneUserStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var user = (User)entity;

            sqlOperation.ProcedureName = "UPD_PHONE_USER_PR";

            sqlOperation.AddVarcharParam("P_ID_USER", user.Id.ToString());
            sqlOperation.AddVarcharParam("P_PHONE", user.phone);

            return sqlOperation;
        }
        
    }
}
