using MicroClientes.Application.Interface;
using MicroClientes.Domain.Entities;
using MicroClientes.Domain.Repository;

namespace MicroClientes.Application.Service
{
    public class ClienteService : IClienteService<Cliente, int>
    {
        private readonly IRepositoryBase<Cliente, int> _repository;

        public ClienteService(IRepositoryBase<Cliente, int> repository)
        {
            _repository = repository;
        }

        public int Count => this._repository.Count;

        public async Task<Cliente> AddEntity(Cliente entity)
        {
            if (entity == null) throw new ArgumentNullException("El cliente es requerido");
            var result = await this._repository.AddEntity(entity);
            return result;
        }

        public void Delete(int entityId)
        {
            this._repository.Delete(entityId);
        }

        public async Task EditEntity(Cliente entity)
        {
            if (entity == null) throw new ArgumentNullException("El Features es requerido");
            var _entityRepo = await this._repository.GetEntityById(entity.id);

            if (_entityRepo == null) throw new ArgumentNullException("No existe el Features");
            _entityRepo.password = entity.password;
            _entityRepo.estado = entity.estado;

            this._repository.EditEntity(_entityRepo);
        }

        public async Task<Cliente?> GetEntityById(int entityId) =>
            await this._repository.GetEntityById(entityId);

        public async Task<List<Cliente>> ListEntity() => await this._repository.ListEntity();
    }
}
