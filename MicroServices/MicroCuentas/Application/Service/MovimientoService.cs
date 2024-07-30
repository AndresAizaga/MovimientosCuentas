using MicroCuentas.Application.Interface;
using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;

namespace MicroCuentas.Application.Service
{
    public class MovimientoService : IMovimientoService<Movimiento, int>
    {
        private readonly IRepositoryBase<Movimiento, int> _repository;

        public MovimientoService(IRepositoryBase<Movimiento, int> repository)
        {
            _repository = repository;
        }

        public int Count => this._repository.Count;

        public async Task<Movimiento> AddEntity(Movimiento entity)
        {
            if (entity == null) throw new ArgumentNullException("El Movimiento es requerido");
            var result = await this._repository.AddEntity(entity);
            return result;
        }

        public void Delete(int entityId)
        {
            this._repository.Delete(entityId);
        }

        public async Task EditEntity(Movimiento entity)
        {
            if (entity == null) throw new ArgumentNullException("El movimient es requerido");
            var _entityRepo = await this._repository.GetEntityById(entity.id);

            if (_entityRepo == null) throw new ArgumentNullException("No existe el movimiento");
            _entityRepo.tipoMovimiento = entity.tipoMovimiento;
            _entityRepo.valor = entity.valor;
            _entityRepo.saldo = entity.saldo;
            _entityRepo.cuentaId = entity.cuentaId;
            _entityRepo.fecha = entity.fecha;

            this._repository.EditEntity(_entityRepo);
        }

        public async Task<Movimiento?> GetEntityById(int entityId) =>
            await this._repository.GetEntityById(entityId);

        public async Task<List<Movimiento>> ListEntity() => await this._repository.ListEntity();
    }
}
