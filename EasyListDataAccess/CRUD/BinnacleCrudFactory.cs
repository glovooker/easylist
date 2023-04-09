using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class BinnacleCrudFactory : CrudFactory
    {
        private BinnacleMapper _mapper;
        public BinnacleCrudFactory()
        {
            _mapper = new BinnacleMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var binnacle = (Binnacle)dto;
            var sqlBinnacle = _mapper.GetCreateStatement(binnacle);
            dao.ExecuteProcedure(sqlBinnacle);
        }

        public override void Delete(BaseEntity dto)
        {
            throw new NotImplementedException();
        }

        public override List<Binnacle> RetrieveAll<Binnacle>()
        {
            var lstBinnacle = new List<Binnacle>();
            var sqlBinnacle = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlBinnacle);

            if (lstResults.Count > 0)
            {
                var objsBinnacle = _mapper.BuildObjects(lstResults);

                foreach (var op in objsBinnacle)
                {
                    lstBinnacle.Add((Binnacle)Convert.ChangeType(op, typeof(Binnacle)));
                }
            }

            return lstBinnacle;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlBinnacle = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlBinnacle);

            var dic = new Dictionary<string, object>();

            if (results.Count > 0)
            {
                dic = results[0];
                var obj = _mapper.BuildObject(dic);
                return (T)Convert.ChangeType(obj, typeof(T));
            }

            return default(T);
        }

        public override void Update(BaseEntity dto)
        {
            throw new NotImplementedException();
        }

    }

}
