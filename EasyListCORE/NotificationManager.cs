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
                to: new Twilio.Types.PhoneNumber($"+50687733016")
            );
        }
    }
}
