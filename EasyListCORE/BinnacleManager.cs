using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class BinnacleManager
    {

        public void Create(Binnacle binnacle)
        {

            var crudBinnacle = new BinnacleCrudFactory();

            var exisBinnacle = crudBinnacle.RetrieveById<Binnacle>(binnacle.Id);

            if(exisBinnacle != null )
            {
                throw new Exception("Binnacle alreday exists!");
            }

            crudBinnacle.Create(binnacle);

        }

        public Binnacle RetrieveById(int id)
        {
            var crudBinnacle = new BinnacleCrudFactory();
            var existBinnacle = crudBinnacle.RetrieveById<Binnacle>(id);

            if(existBinnacle == null )
            {
                throw new Exception("Binnacle does not exist!");
            }

            return existBinnacle;
        }

        public List<Binnacle> RetrieveAll()
        {
            var crudBinnacle = new BinnacleCrudFactory();
            return crudBinnacle.RetrieveAll<Binnacle>();
        }

    }

}
