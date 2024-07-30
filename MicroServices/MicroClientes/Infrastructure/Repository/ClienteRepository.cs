using MicroClientes.Domain.Entities;
using MicroClientes.Domain.Repository;

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

        public Cliente AddEntity(Cliente entity)
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

        public void EditEntity(Cliente entity)
        {
            this.context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.context.SaveChanges();
        }

        public Cliente? GetEntityById(int entityId) =>
            this.context.Clientes.Find(entityId) ?? null;

        public List<Cliente> ListEntity() =>
            this.context.Clientes.ToList();
    }
}
