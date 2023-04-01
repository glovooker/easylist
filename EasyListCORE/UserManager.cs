using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class UserManager
    {
        public void Create(User user)
        {
            var crudUser = new UserCrudFactory();

            crudUser.Create(user);
        }

        public User RetrieveByEmail(string email)
        {
            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveByEmail<User>(email);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            return existUser;
        }

        public User RetrieveById(int id)
        {
            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveById<User>(id);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            return existUser;
        }

        public List<User> RetrieveAll()
        {
            var crudUser = new UserCrudFactory();
            return crudUser.RetrieveAll<User>();
        }

        public void Update(User user)
        {
            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveById<User>(user.Id);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            crudUser.Update(user);
        }

        public void Delete(User user)
        {
            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveById<User>(user.Id);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            crudUser.Delete(user);
        }

        public User Login(string email, string password)
        {
            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveByEmail<User>(email);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            var pm = new PasswordManager();
            var isRightPassword = pm.ValidatePassword(email, password);

            if (!isRightPassword)
            {
                throw new Exception("Wrong password!");
            }

            return existUser;
        }
    }
}