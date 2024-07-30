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

        public Cliente AddEntity(Cliente entity)
        {
            if (entity == null) throw new ArgumentNullException("El cliente es requerido");
            var result = this._repository.AddEntity(entity);
            return result;
        }

        public void Delete(int entityId)
        {
            this._repository.Delete(entityId);
        }

        public void EditEntity(Cliente entity)
        {
            if (entity == null) throw new ArgumentNullException("El Features es requerido");
            var _entityRepo = this._repository.GetEntityById(entity.id);

            if (_entityRepo == null) throw new ArgumentNullException("No existe el Features");
            _entityRepo.password = entity.password;
            _entityRepo.estado = entity.estado;

            this._repository.EditEntity(_entityRepo);
        }

        public Cliente? GetEntityById(int entityId) =>
            this._repository.GetEntityById(entityId);

        public List<Cliente> ListEntity() => this._repository.ListEntity();
    }
}
