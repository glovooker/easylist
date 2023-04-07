using DTOs;
using System;
using System.Collections.Generic;
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
            //crea un codigo de validacion con 6 digitos puede tener letras y numeros al azar pero no se pueden repetir los codigos
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var result = new string(Enumerable.Repeat(chars, 6).Select(s => s[random.Next(s.Length)]).ToArray());
            validation.validationCode = result;
            validation.validationDateCreation = DateTime.Now;
            validation.validationDateExpired = DateTime.Now.AddDays(1);
            validation.validationCount = 0;
            crudValidation.Create(validation);
        }
    }
}
