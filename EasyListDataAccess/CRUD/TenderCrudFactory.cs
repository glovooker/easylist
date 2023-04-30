using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class TenderCrudFactory : CrudFactory
    {

        private TenderMapper _mapper;
        public TenderCrudFactory()
        {
            _mapper = new TenderMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var tender = (Tender)dto;
            var sqlTender = _mapper.GetCreateStatement(tender);
            dao.ExecuteProcedure(sqlTender);
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlTender = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlTender);

            var dic = new Dictionary<string, object>();

            if (results.Count > 0)
            {
                dic = results[0];
                var obj = _mapper.BuildObject(dic);
                return (T)Convert.ChangeType(obj, typeof(T));
            }

            return default(T);
        }

        public override List<Tender> RetrieveAll<Tender>()
        {
            var lstTenders = new List<Tender>();
            var sqlTender = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlTender);

            if (lstResults.Count > 0)
            {
                var objsTenders = _mapper.BuildObjects(lstResults);

                foreach (var op in objsTenders)
                {
                    lstTenders.Add((Tender)Convert.ChangeType(op, typeof(Tender)));
                }
            }

            return lstTenders;
        }

        public override void Update(BaseEntity dto)
        {
            var tender = (Tender)dto;
            var sqlTender = _mapper.GetUpdateStatement(tender);
            dao.ExecuteProcedure(sqlTender);
        }

        public override void Delete(BaseEntity dto)
        {
            var tender = (Tender)dto;
            var sqlTender = _mapper.GetDeleteStatement(tender);
            dao.ExecuteProcedure(sqlTender);
        }

        public List<T> RetrieveByDate<T>(string startDate, string endDate)
        {
            var lstUsers = new List<T>();
            var sqlUser = _mapper.GetRetrieveByDateStatement(startDate, endDate);
            var lstResults = dao.ExecuteQueryProcedure(sqlUser);

            if (lstResults.Count > 0)
            {
                var objsUsers = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsers)
                {
                    lstUsers.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstUsers;
        }

        public List<Tender> RetrieveByStatusTender<Tender>()
        {

            var lstTender = new List<Tender>();
            var sqlTender = _mapper.GetRetrieveByStatus();
            var lstResults = dao.ExecuteQueryProcedure(sqlTender);

            if (lstResults.Count > 0)
            {
                var objsTender = _mapper.BuildObjects(lstResults);

                foreach (var op in objsTender)
                {
                    lstTender.Add((Tender)Convert.ChangeType(op, typeof(Tender)));
                }
            }

            return lstTender;
        }

    }
}
