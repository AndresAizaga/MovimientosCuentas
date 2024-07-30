using MicroClientes.Application.Service;
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
        
        public ClientesController(MicroContext _db) {
            this.db = _db;
        }

        private ClienteService CreateService()
        {
            ClienteRepository repository = new ClienteRepository(db);
            ClienteService service = new ClienteService(repository);
            return service;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            var result = CreateService().ListEntity();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            var result = CreateService().GetEntityById(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add([FromBody] Cliente request)
        {
            var result = CreateService().AddEntity(request);
            return Ok(result);
        }

        [HttpPut]
        [Route("Update")]
        public IActionResult Update([FromBody] Cliente request)
        {
            CreateService().EditEntity(request);
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
