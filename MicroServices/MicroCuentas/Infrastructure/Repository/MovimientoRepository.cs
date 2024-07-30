using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure.Repository
{
    public class MovimientoRepository : IRepositoryBase<Movimiento, int>
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
            this.context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.context.SaveChanges();
        }

        public async Task<Movimiento?> GetEntityById(int entityId) =>
            this.context.Movimientos.Include(m => m.cuenta).FirstOrDefault(x => x.id == entityId) ?? null;

        public async Task<List<Movimiento>> ListEntity() =>
            this.context.Movimientos.Include(m => m.cuenta).ToList();
    }
}
