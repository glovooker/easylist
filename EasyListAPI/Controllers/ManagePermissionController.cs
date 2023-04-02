using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;
using System.Security;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagePermissionController : ControllerBase
    {
        [HttpPost]
        [Route("createPermission")]
        public async Task<IActionResult> CreatePermission(ManagePermission managepermission)
        {
            try
            {
                var um = new ManagePermissionManager();
                um.Create(managepermission);
                return Ok("The permission has been successfully added.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("checkPermission")]
        public async Task<IActionResult> CheckPermission(ManagePermission managepermission)
        {

            var um = new ManagePermissionManager();

            var retrievedPermission = um.Check(managepermission);

            if (retrievedPermission == null)
            {
                return NoContent();
            }

            return Ok(retrievedPermission);
        }

        [HttpDelete]
        [Route("deletePermission")]
        public async Task<IActionResult> DeletePermission(ManagePermission managepermission)
        {
            try
            {
                var um = new ManagePermissionManager();
                um.Delete(managepermission);
                return Ok(managepermission);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
