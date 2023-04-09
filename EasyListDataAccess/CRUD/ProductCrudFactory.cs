using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class ProductCrudFactory : CrudFactory
    {
        private ProductMapper _mapper;

        public ProductCrudFactory()
        {
            _mapper = new ProductMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var product = (Product)dto;
            var sqlProduct = _mapper.GetCreateStatement(product);
            dao.ExecuteProcedure(sqlProduct);
        }

        public override void Delete(BaseEntity dto)
        {
            var product = (Product)dto;
            var sqlProduct = _mapper.GetDeleteStatement(product);
            dao.ExecuteProcedure(sqlProduct);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstProducts = new List<T>();
            var sqlProduct = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlProduct);

            if (lstResults.Count > 0)
            {
                var objsProducts = _mapper.BuildObjects(lstResults);

                foreach (var op in objsProducts)
                {
                    lstProducts.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }
            return lstProducts;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlProduct = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlProduct);

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
