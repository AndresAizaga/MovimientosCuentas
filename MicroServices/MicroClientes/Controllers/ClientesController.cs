using MicroClientes.Application.Service;
using MicroClientes.Controllers.DTO;
using MicroClientes.Domain.Entities;
using MicroClientes.Infrastructure;
using MicroClientes.Infrastructure.Repository;
using Microsoft.AspNetCore.Http;
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
            var result = CreateService().GetEntityById(id);
            return Ok(result);
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
            return Ok(cliente);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Cliente request)
        {
            await CreateService().EditEntity(request);
            return Ok("Registro actualizado exitosamente");
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int id)
        {
            CreateService().Delete(id);
            return Ok("Registro eliminado exitosamente");
        }
    }
}
