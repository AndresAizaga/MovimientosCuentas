using MicroClientes.Application.Interface;
using MicroClientes.Domain.Entities;
using MicroClientes.Domain.Repository;

namespace MicroClientes.Application.Service
{
    public class PersonaService : IPersonaService<Persona, int>
    {
        private readonly IRepositoryBase<Persona, int> _repository;

        public PersonaService(IRepositoryBase<Persona, int> repository)
        {
            _repository = repository;
        }

        public int Count => this._repository.Count;

        public async Task<Persona> AddEntity(Persona entity)
        {
            if (entity == null) throw new ArgumentNullException("La Persona es requerido");
            var result = await this._repository.AddEntity(entity);
            return result;
        }

        public void Delete(int entityId)
        {
            this._repository.Delete(entityId);
        }

        public async Task EditEntity(Persona entity)
        {
            if (entity == null) throw new ArgumentNullException("El Features es requerido");
            var _entityRepo = await this._repository.GetEntityById(entity.id);

            if (_entityRepo == null) throw new ArgumentNullException("No existe el Features");
            _entityRepo.identificacion = entity.identificacion;
            _entityRepo.edad = entity.edad;
            _entityRepo.telefono = entity.telefono;
            _entityRepo.genero = entity.genero;
            _entityRepo.direccion = entity.direccion;
            _entityRepo.nombre = entity.nombre;

            this._repository.EditEntity(_entityRepo);
        }

        public async Task<Persona>? GetEntityById(int entityId) =>
            await this._repository.GetEntityById(entityId);

        public async Task<List<Persona>> ListEntity() => await this._repository.ListEntity();
    }
}
