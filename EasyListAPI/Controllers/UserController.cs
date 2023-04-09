using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("createUser")]
        public async Task<IActionResult> CreateUser(User user)
        {
            try
            {
                var um = new UserManager();
                um.Create(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getUserById")]
        public async Task<IActionResult> RetrieveUserById(int id)
        {
            try
            {
                var um = new UserManager();
                var user = um.RetrieveById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getUserByEmail")]
        public async Task<IActionResult> RetrieveUserByEmail(string email)
        {
            try
            {
                var um = new UserManager();
                var user = um.RetrieveByEmail(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getAllUsers")]
        public async Task<IActionResult> RetrieveAllUsers()
        {
            try
            {
                var um = new UserManager();
                var users = um.RetrieveAll();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateUser")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            try
            {
                var um = new UserManager();
                um.Update(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteUser")]
        public async Task<IActionResult> DeleteUser(User user)
        {
            try
            {
                var um = new UserManager();
                um.Delete(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("registerUser")]
        public async Task<IActionResult> RegisterUser(User user)
        {
            try
            {
                var um = new UserManager();
                um.Register(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("loginUser")]
        public async Task<IActionResult> LoginUser(string email, string password)
        {
            try
            {
                var um = new UserManager();
                var user = um.Login(email, password);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getUsersByDate")]
        public async Task<IActionResult> RetrieveUsersByDate(string startDate, string endDate)
        {
            try
            {
                var um = new UserManager();
                var users = um.RetrieveByDate(startDate, endDate);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("recoverUser")]
        public async Task<IActionResult> RecoverUser(string email)
        {
            try
            {
                var um = new UserManager();
                var newPassword = um.RecoverUser(email);
                return Ok(newPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
