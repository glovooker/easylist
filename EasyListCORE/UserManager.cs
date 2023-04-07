﻿using DTOs;
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

        public void Register(User user)
        {
            var crudUser = new UserCrudFactory();
            var crudPassword = new PasswordCrudFactory();
            var existUser = crudUser.RetrieveById<User>(user.Id);

            if (existUser != null)
            {
                throw new Exception("User already registered!");
            }

            crudUser.Create(user);

            var currentUser = crudUser.RetrieveByEmail<User>(user.email);
            currentUser.password = user.password;

            var password = new Password();
            password.Id = currentUser.Id;
            password.password = currentUser.password;
            password.idUser = currentUser.Id;
            password.isActive = true;
            password.creationDate = currentUser.registrationDate;

            crudPassword.Create(password);
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

        public List<User> RetrieveByDate(string startDate, string endDate)
        {
            var crudUser = new UserCrudFactory();
            return crudUser.RetrieveByDate<User>(startDate, endDate);
        }
    }
}