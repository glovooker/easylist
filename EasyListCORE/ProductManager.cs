using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class ProductManager
    {   
        public void Create(Product product)
        {
            var crudProduct = new ProductCrudFactory();

            var existProduct = crudProduct.RetrieveById<Product>(product.Id);

            crudProduct.Create(product);

        }
        public void Delete(Product product)
        {
            var crudProduct = new ProductCrudFactory();
            var existProduct = crudProduct.RetrieveById<Product>(product.Id);

            if (existProduct == null)
            {
                throw new Exception("The product does not exist!");
            }

            crudProduct.Delete(product);
        
        }
        public Product RetrieveById(int id)
        {
            var crudProduct = new ProductCrudFactory();
            var existProduct = crudProduct.RetrieveById<Product>(id);

            if (existProduct == null)
            {
                throw new Exception("The product does not exist!");
            }

            return existProduct;
        }
        public List<Product> RetrieveAll()
        {
            var crudProduct = new ProductCrudFactory();
            return crudProduct.RetrieveAll<Product>();
        }
    }
}
