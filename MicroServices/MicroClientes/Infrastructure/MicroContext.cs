using MicroClientes.Domain.Entities;
using MicroClientes.Infrastructure.Configs;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace MicroClientes.Infrastructure
{
    public class MicroContext : DbContext
    {
        public MicroContext(DbContextOptions<MicroContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Persona> Personas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ClienteConfig());
            modelBuilder.ApplyConfiguration(new PersonaConfig());
        }
    }
}
