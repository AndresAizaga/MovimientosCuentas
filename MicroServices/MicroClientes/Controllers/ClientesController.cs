using MicroClientes.Application.Service;
using MicroClientes.Controllers.DTO;
using MicroClientes.Domain.Entities;
using MicroClientes.Infrastructure;
using MicroClientes.Infrastructure.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MicroClientes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly MicroContext db;

        public ClientesController(MicroContext _db)
        {
            this.db = _db;
        }

        private ClienteService CreateService()
        {
            ClienteRepository repository = new ClienteRepository(db);
            ClienteService service = new ClienteService(repository);
            return service;
        }

        private PersonaService CreatePersonaService()
        {
            PersonaRepository repository = new PersonaRepository(db);
            PersonaService service = new PersonaService(repository);
            return service;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = CreateService().ListEntity();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var service = CreateService();
                var result = await service.GetEntityById(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] ClientePersonaDTO request)
        {
            var persona = await CreatePersonaService().AddEntity(new Persona
            {
                direccion = request.direccion,
                edad = request.edad,
                genero = request.genero,
                identificacion = request.identificacion,
                nombre = request.nombre,
                telefono = request.telefono
            });
            var cliente = await CreateService().AddEntity(new Cliente
            {
                estado = request.estado,
                password = request.password,
                personaId = persona.id,
            });
            return CreatedAtAction(nameof(GetById), new { id = cliente.id }, cliente);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Cliente request)
        {
            try
            {
                await CreateService().EditEntity(request);
                return Ok("Registro actualizado exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }
            
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                CreateService().Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {statusCode = 500, message = ex.Message });
            }
        }
    }
}
