﻿using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;
using static DTOs.Validation;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        [HttpPost]
        [Route("createValidation")]

        public async Task<IActionResult> CreateValidation(Validation validation)
        {
            try
            {
                var vm = new ValidationManager();
                vm.Create(validation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getValidationById")]
        public async Task<IActionResult> RetrieveValidationById(int id)
        {
            try
            {
                var vm = new ValidationManager();
                var validation = vm.RetrieveById(id);
                return Ok(validation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getValidationByUserId&Status")]
        public async Task<IActionResult> RetrieveValidationByUserIdAndStatus(string userId)
        {
            try
            {
                var vm = new ValidationManager();
                var validate = vm.RetrieveByUserIdAndStatus(userId);
                return Ok(validate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("updateValidation")]
        public async Task<IActionResult> UpdateValidation(Validation validation)
        {
            try
            {
                var vm = new ValidationManager();
                vm.Update(validation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updatePhoneUser")]
        public async Task<IActionResult> UpdatePhoneUser(User user)
        {
            try
            {
                var vm = new ValidationManager();
                vm.UpdatePhoneUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteValidation")]
        public async Task<IActionResult> DeleteValidation(User user)
        {
            try
            {
                var vm = new ValidationManager();
                vm.Delete(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
