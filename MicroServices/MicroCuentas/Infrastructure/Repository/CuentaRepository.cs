using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure.Repository
{
    public class CuentaRepository : IRepositoryBase<Cuenta, int>
    {
        private MicroContext context;

        public CuentaRepository(MicroContext context)
        {
            this.context = context;
        }


        public int Count => this.context.Cuentas.Count();

        public async Task<Cuenta> AddEntity(Cuenta entity)
        {
            this.context.Cuentas.Add(entity);
            this.context.SaveChanges();
            return entity;
        }

        public void Delete(int entityId)
        {
            var entity = this.context.Cuentas.Find(entityId);
            if (entity != null)
            {
                this.context.Cuentas.Remove(entity);
                this.context.SaveChanges();
            }
        }

        public async Task EditEntity(Cuenta entity)
        {
            this.context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.context.SaveChanges();
        }

        public async Task<Cuenta?> GetEntityById(int entityId) =>
            this.context.Cuentas.Include(c => c.cliente).Include(p => p.cliente.persona).FirstOrDefault(x => x.id == entityId) ?? null;

        public async Task<List<Cuenta>> ListEntity() =>
            this.context.Cuentas.Include(c => c.cliente).Include(p => p.cliente.persona).ToList();
    }
}
