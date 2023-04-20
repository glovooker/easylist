using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class OfferCrudFactory : CrudFactory
    {

        private OfferMapper _mapper;
        public OfferCrudFactory()
        {
            _mapper = new OfferMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var offer = (Offer)dto;
            var sqlTender = _mapper.GetCreateStatement(offer);
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
            var offer = (Offer)dto;
            var sqlOperation = _mapper.GetUpdateStatement(offer);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var offer = (Offer)dto;
            var sqlOperation = _mapper.GetDeleteStatement(offer);
            dao.ExecuteProcedure(sqlOperation);
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

        public List<T> CheckExistingOffers<T>(int tender, int user)
        {
            var lstUsers = new List<T>();
            var sqlUser = _mapper.GetRetrieveCheckExistingOffers(tender, user);
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

        public List<Offer> RetrieveByTenderId<Offer>(int id)
        {
            var lstOffers = new List<Offer>();
            var sqlOffer = _mapper.GetRetrieveByTenderIdStatement(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlOffer);

            if (lstResults.Count > 0)
            {
                var objsOffers = _mapper.BuildObjects(lstResults);

                foreach (var op in objsOffers)
                {
                    lstOffers.Add((Offer)Convert.ChangeType(op, typeof(Offer)));
                }
            }

            return lstOffers;
        }
    }
}
