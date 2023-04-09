using DTOs;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace EasyListCORE
{
    public class NotificationManager
    {
        private static string _sendGridApiKey = "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";
        private static EmailAddress _from = new EmailAddress("lmongec@ucenfotec.ac.cr", "NASA Math");

        private static string _accountSid = "ACbc18ccd6a7f89f316a4c2ea84b0e19a4";
        private static string _authToken = "d03bb4a21908238ca51b3e3b52e12b4c";
        private static string _fromNumber = "+12678670250";

        public async void NotifyBySMS(string message, string contact)
        {
            TwilioClient.Init(_accountSid, _authToken);
            var sms = MessageResource.Create(
                body: message,
                from: new Twilio.Types.PhoneNumber(_fromNumber),
                to: new Twilio.Types.PhoneNumber(contact)
            );
        }

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
