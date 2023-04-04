using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;
using System.Security;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        [HttpPost]
        [Route("createPermission")]
        public async Task<IActionResult> CreatePermission(Permission permission)
        {
            try
            {
                var um = new PermissionManager();
                um.Create(permission);
                return Ok("The permission " + permission.name + " has been successfully added.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getPermissionById")]
        public async Task<IActionResult> RetrievePermissionById(int id)
        {
            try
            {
                var um = new PermissionManager();
                var permission = um.RetrieveById(id);
                return Ok(permission);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getAllPermissions")]
        public async Task<IActionResult> RetrieveAllPermission()
        {
            try
            {
                var um = new PermissionManager();
                var permissions = um.RetrieveAll();
                return Ok(permissions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updatePermission")]
        public async Task<IActionResult> UpdatePermission(Permission permission)
        {
            try
            {
                var um = new PermissionManager();
                um.Update(permission);
                return Ok(permission);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deletePermission")]
        public async Task<IActionResult> DeletePermission(Permission permission)
        {
            try
            {
                var um = new PermissionManager();
                um.Delete(permission);
                return Ok(permission);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
