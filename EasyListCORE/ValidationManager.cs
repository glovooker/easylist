using DTOs;
using EasyListDataAccess.CRUD;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListCORE
{
    public class ValidationManager
    {
        public void Create(Validation validation)
        {
            var crudValidation = new ValidationCrudFactory();


            var crudUser = new UserCrudFactory();
            var user = crudUser.RetrieveByEmail<User>(validation.userId);

            if (user == null)
            {
                throw new Exception("User does not exist!");
            }

            var pendingValidations = crudValidation.RetrievePendingValidationsByUserId(user.Id);
            if (pendingValidations.Count > 0)
            {
                // Ya existe una validación pendiente, no se hace nada
                throw new Exception("Cannot create a validation if the code already exists.");
            }
            var random = new Random();
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var result = new string(Enumerable.Repeat(chars, 6).Select(s => s[random.Next(s.Length)]).ToArray());
                validation.userId = user.Id.ToString();
                validation.validationCode = result;
                validation.validationDateCreation = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Local);
                validation.validationDateExpired = DateTime.SpecifyKind(DateTime.Now.AddMinutes(30), DateTimeKind.Local);
                validation.validationStatus = 0;
                validation.validationCount = 1;

                var nm = new NotificationManager();
                nm.NotifyAccountValidation(validation);

                crudValidation.Create(validation);
            
        }
        public void Update(Validation validation)
        {
            
            var crudValidation = new ValidationCrudFactory();

            var existValidation = crudValidation.RetrieveById<Validation>(validation.Id);

            if (existValidation != null)
            {
                crudValidation.Update(validation);
            }
            else
            {
                throw new Exception("Validation does not exist!");
            }        
        
        }

        public void UpdatePhoneUser(User user)
        {

            var crudUserPhone = new ValidationCrudFactory();
            var crudUser = new UserCrudFactory();

            var existUser = crudUser.RetrieveByEmail<User>(user.email);
            user.Id= existUser.Id;

            if (existUser != null)
            {
                crudUserPhone.UpdatePhoneUser(user);
            }
            else
            {
                throw new Exception("User does not exist!");
            }

        }
        public void Delete(User user) { 
            var crudValidation = new UserCrudFactory();
            var existValidation = crudValidation.RetrieveById<User>(user.Id);
            if (existValidation != null)
            {
                crudValidation.Delete(user);
            }
            else
                {
                throw new Exception("User does not exist!");
            }
            

            
        
        }



        public Validation RetrieveById(int id)
        {
            var crudValidation = new ValidationCrudFactory();
            var existValidation = crudValidation.RetrieveById<Validation>(id);

            if (existValidation == null)
            {
                throw new Exception("Validation does not exist!");
            }

            return existValidation;
        }

        public List<Validation> RetrieveByUserIdAndStatus(string userId)
        {
            var crudValidation = new ValidationCrudFactory();
            var crudUser = new UserCrudFactory();

            var existUser = crudUser.RetrieveByEmail<User>(userId);
            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }
            var idUser = existUser.Id;
            var existValidation = crudValidation.RetrieveByUserId<Validation>(idUser);

            if (existValidation == null)
            {
                throw new Exception("Validation does not exist!");
            }

            if (existValidation.userId != idUser.ToString())
            {
                throw new Exception("Validation does not belong to user!");
            }

            var pendingValidations = crudValidation.RetrievePendingValidationsByUserId(int.Parse(existValidation.userId));
            return pendingValidations;
        }


    }
}
