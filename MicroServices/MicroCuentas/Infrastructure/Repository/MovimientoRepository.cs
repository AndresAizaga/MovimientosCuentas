using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;
using MicroCuentas.Domain.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure.Repository
{
    public class MovimientoRepository : IMovimientoRepository
    {
        private MicroContext context;

        public MovimientoRepository(MicroContext context)
        {
            this.context = context;
        }


        public int Count => this.context.Movimientos.Count();

        public async Task<Movimiento> AddEntity(Movimiento entity)
        {
            this.context.Movimientos.Add(entity);
            this.context.SaveChanges();
            return entity;
        }

        public void Delete(int entityId)
        {
            var entity = this.context.Movimientos.Find(entityId);
            if (entity != null)
            {
                this.context.Movimientos.Remove(entity);
                this.context.SaveChanges();
            }
        }

        public async Task EditEntity(Movimiento entity)
        {
            this.context.Entry(entity).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public async Task<List<Movimiento>> GetByCuentaId(int cuentaId)
        {
            return this.context.Movimientos.Where(x => x.cuentaId == cuentaId).Include(m => m.cuenta).ToList();
        }

        public async Task<List<Movimiento>> GetByFechas(DateTime fechaDesde, DateTime fechaHasta)
        {
            return this.context.Movimientos.Where(x => x.fecha >= fechaDesde && x.fecha <= fechaHasta).OrderBy(x => x.cuentaId).OrderBy(x => x.fecha).ToList();
        }

        public async Task<Movimiento?> GetEntityById(int entityId) =>
            this.context.Movimientos.Include(m => m.cuenta).FirstOrDefault(x => x.id == entityId) ?? null;

        public async Task<List<Movimiento>> ListEntity() =>
            this.context.Movimientos.Include(m => m.cuenta).ToList();
    }

    public interface IMovimientoRepository : IRepositoryBase<Movimiento, int>
    {
        Task<List<Movimiento>> GetByCuentaId(int cuentaId);
        Task<List<Movimiento>> GetByFechas(DateTime fechaDesde, DateTime fechaHasta);
    }
}
