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
            password.isTemporal = false;
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

        public string RecoverUser(string email)
        {
            var crudUser = new UserCrudFactory();
            var crudPassword = new PasswordCrudFactory();

            var currentUser = crudUser.RetrieveByEmail<User>(email);

            if (currentUser == null)
            {
                throw new Exception("User does not exist!");
            }

            var id = currentUser.Id;

            crudPassword.DisPassword(id);

            // Generar una contraseña aleatoria que cumpla con los requisitos
            const string chars = "!\"$%'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
            var random = new Random();

            string newPassword;

            do
            {
                newPassword = new string(
                    Enumerable.Repeat(chars, 8)
                    .Select(s => s[random.Next(s.Length)])
                    .ToArray());
            }
            while (!newPassword.Any(char.IsUpper) || !newPassword.Any(char.IsLower) || !newPassword.Any(char.IsDigit) || !newPassword.Any(char.IsSymbol));

            currentUser.password = newPassword;

            var password = new Password();
            password.Id = currentUser.Id;
            password.password = newPassword;
            password.idUser = currentUser.Id;
            password.isActive = true;
            password.isTemporal = true;
            password.creationDate = currentUser.registrationDate;

            crudPassword.Create(password);

            var nm = new NotificationManager();

            var message = "<html><body><p>Hello " + currentUser.name + " " + currentUser.firstLastName + ",</p>" +
            "<p>We're sorry that you've had trouble logging in to EasyList.</p>" +
            "<p>Below you'll find your temporary password to access your account: <b>" + newPassword + "</b>.</p>" +
            "<p>Please consider changing your password as soon as possible to ensure the security of your account.</p>" +
            "<p>Thank you for using EasyList.</p>" +
            "<p>Best regards,</p>" +
            "<p>The EasyList team</p></body></html>";

            nm.NotifyByEmail(message, email);

            // Devuelve la nueva contraseña generada
            return newPassword;

        }

        public string AvailableUser(string email, string newpassword)
        {
            var crudUser = new UserCrudFactory();
            var crudPassword = new PasswordCrudFactory();

            var currentUser = crudUser.RetrieveByEmail<User>(email);

            if (currentUser == null)
            {
                throw new Exception("User does not exist!");
            }

            var id = currentUser.Id;

            crudPassword.DisPassword(id);

            var password = new Password();
            password.Id = currentUser.Id;
            password.password = newpassword;
            password.idUser = currentUser.Id;
            password.isActive = true;
            password.isTemporal = false;
            password.creationDate = currentUser.registrationDate;

            crudPassword.Create(password);

            return password.ToString();

        }
    }
}