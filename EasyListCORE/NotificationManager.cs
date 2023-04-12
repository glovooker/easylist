using DTOs;
using SendGrid;
using SendGrid.Helpers.Mail;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace EasyListCORE
{
    public class NotificationManager
    {
        public void NotifyAccountValidation(Validation validation)
        {
            var user = new UserManager().RetrieveById(int.Parse(validation.userId));
            var validationType = validation.validationType.ToString();
            var validationCode = validation.validationCode;
            var validationDateCreation = validation.validationDateCreation;
            if (validationType == "EMAIL")
            {
                NotifyValidationByEmail(validationCode, validationDateCreation, user.email);
            }
            else if (validationType == "PHONE")
            {
                NotifyValidationByPhone(validationCode, validationDateCreation, user.phone);
            }
            else if (validationType == "BOTH")
            {
                NotifyValidationByEmail(validationCode, validationDateCreation, user.email);
                NotifyValidationByPhone(validationCode, validationDateCreation, user.phone);
            }
        }
        private async Task NotifyValidationByEmail(string validationCode, DateTime validationDateCreation, string email)
        {

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("josias.andres@hotmail.com", "Easylist");
            var subject = "Validacion con OTP";
            var to = new EmailAddress(email);
            var plainTextContent = $"Tu codigo OTP es : {validationCode}. \nEl codigo expira en 30 minutos y fue creado a las {validationDateCreation.Hour}:{validationDateCreation.Minute}";
            var htmlContent = $"Tu codigo OTP es : {validationCode}. \nEl codigo expira en 30 minutos y fue creado a las {validationDateCreation.Hour}:{validationDateCreation.Minute}";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
        private void NotifyValidationByPhone(string validationCode, DateTime validationDateCreation, string phone)
        {
            string accountSid = "AC7c641af885f7e2fd0b9612ca9e9137d5";
            string authToken = "dba9d7e75354dc63c4b96b5334d0a9d5";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: $"Tu codigo OTP es : {validationCode}. \nEl codigo expira en 30 minutos y fue creado a las {validationDateCreation.Hour}:{validationDateCreation.Minute}",
                from: new Twilio.Types.PhoneNumber("+17473194370"),
                to: new Twilio.Types.PhoneNumber($"{phone}")
            );
        }

        private static string _sendGridApiKey = "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";
        private static EmailAddress _from = new EmailAddress("lmongec@ucenfotec.ac.cr", "EasyList");

        public async void NotifyByEmail(string message, string contact)
        {
            var client = new SendGridClient(_sendGridApiKey);
            var from = _from;
            var subject = "EasyList Notification";
            var to = new EmailAddress(contact, "EasyList User");
            var plainTextContent = message;
            var htmlContent = message;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            try
            {
                var response = await client.SendEmailAsync(msg);
                Console.WriteLine("Correo electrónico enviado exitosamente a {0}", contact);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al enviar el correo electrónico: {0}", ex.Message);
            }
        }
    }
}
