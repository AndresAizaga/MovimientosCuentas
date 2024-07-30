using MicroClientes.Domain.Entities;
using MicroClientes.Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace MicroClientes.Infrastructure.Repository
{
    public class ClienteRepository : IRepositoryBase<Cliente, int>
    {
        private MicroContext context;

        public ClienteRepository(MicroContext context)
        {
            this.context = context;
        }


        public int Count => this.context.Clientes.Count();

        public async Task<Cliente> AddEntity(Cliente entity)
        {
            this.context.Clientes.Add(entity);
            this.context.SaveChanges();
             return entity;
        }

        public void Delete(int entityId)
        {
            var entity = this.context.Clientes.Find(entityId);
            if (entity != null)
            {
                this.context.Clientes.Remove(entity);
                this.context.SaveChanges();
            }
        }

        public async Task EditEntity(Cliente entity)
        {
            this.context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.context.SaveChanges();
        }

        public async Task <Cliente?> GetEntityById(int entityId) =>
            this.context.Clientes.Include(p => p.persona).FirstOrDefault( x=> x.id == entityId) ?? null;

        public async Task<List<Cliente>> ListEntity() =>
            this.context.Clientes.Include( p => p.persona).ToList();
    }
}
