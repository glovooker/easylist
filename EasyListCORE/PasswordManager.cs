using DTOs;
using EasyListDataAccess.CRUD;
using System.Security.Cryptography;
using System.Text;

namespace EasyListCORE
{
    public class PasswordManager
    {
        public void Create(Password password)
        {
            var crudPassword = new PasswordCrudFactory();

            var previousPasswords = crudPassword.RetrieveLastFive<Password>(password.idUser);

            if (previousPasswords != null)
            {
                if (previousPasswords.Contains(password))
                {
                    throw new Exception("You can't use a previous password. Please use a new one!");
                }
            }

            crudPassword.Create(password);
        }

        public Password RetrieveByUserId(int id)
        {
            var crudPassword = new PasswordCrudFactory();
            var existPassword = crudPassword.RetrieveByUserId<Password>(id);

            if (existPassword == null)
            {
                throw new Exception("Password does not exist!");
            }

            return existPassword;
        }

        public Password RetrieveByEmail(string email)
        {
            var crudPassword = new PasswordCrudFactory();
            var existPassword = crudPassword.RetrieveByEmail<Password>(email);

            if (existPassword == null)
            {
                throw new Exception("Password does not exist!");
            }

            return existPassword;
        }

        public List<Password> RetrieveLastFive(int id)
        {
            var crudPassword = new PasswordCrudFactory();
            var previousPasswords = crudPassword.RetrieveLastFive<Password>(id);

            if (previousPasswords == null)
            {
                throw new Exception("No previous passwords!");
            }

            return previousPasswords;
        }

        public void Update(Password password)
        {
            var crudPassword = new PasswordCrudFactory();
            var existPassword = crudPassword.RetrieveByUserId<Password>(password.idUser);

            if (existPassword == null)
            {
                throw new Exception("Password does not exist!");
            }

            crudPassword.Update(password);
        }

        public void Delete(Password password)
        {
            var crudPassword = new PasswordCrudFactory();
            var existPassword = crudPassword.RetrieveByUserId<Password>(password.idUser);

            if (existPassword == null)
            {
                throw new Exception("Password does not exist!");
            }

            crudPassword.Delete(password);
        }

        public bool ValidatePassword(string email, string password)
        {
            var crudPassword = new PasswordCrudFactory();
            var UserPasswordObj = crudPassword.RetrieveByEmail<Password>(email);

            if (UserPasswordObj == null)
            {
                return false;
            }

            password = Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(password)));

            if (password == UserPasswordObj.password)
            {
                return true;
            }

            return false;
        }

        public string GetEncryptedPassword(string password)
        {
            return Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
    }
}

