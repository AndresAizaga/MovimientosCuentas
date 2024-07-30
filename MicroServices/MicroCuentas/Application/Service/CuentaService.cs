using MicroCuentas.Application.Interface;
using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;

namespace MicroCuentas.Application.Service
{
    public class CuentaService : ICuentaService<Cuenta, int>
    {
        private readonly IRepositoryBase<Cuenta, int> _repository;

        public CuentaService(IRepositoryBase<Cuenta, int> repository)
        {
            _repository = repository;
        }

        public int Count => this._repository.Count;

        public async Task<Cuenta> AddEntity(Cuenta entity)
        {
            if (entity == null) throw new ArgumentNullException("El Cuenta es requerido");
            var result = await this._repository.AddEntity(entity);
            return result;
        }

        public void Delete(int entityId)
        {
            this._repository.Delete(entityId);
        }

        public async Task EditEntity(Cuenta entity)
        {
            if (entity == null) throw new ArgumentNullException("La cuenta es requerido");
            var _entityRepo = await this._repository.GetEntityById(entity.id);

            if (_entityRepo == null) throw new ArgumentNullException("No existe la cuenta");
            _entityRepo.tipoCuenta = entity.tipoCuenta;
            _entityRepo.numeroCuenta = entity.numeroCuenta;
            _entityRepo.estado = entity.estado;
            _entityRepo.clienteId = entity.clienteId;
            _entityRepo.saldoInicial = entity.saldoInicial;

            this._repository.EditEntity(_entityRepo);
        }

        public async Task<Cuenta?> GetEntityById(int entityId) =>
            await this._repository.GetEntityById(entityId);

        public async Task<List<Cuenta>> ListEntity() => await this._repository.ListEntity();
    }
}
