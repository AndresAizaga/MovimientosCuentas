using MicroCuentas.Domain.Entities;
using MicroCuentas.Infrastructure.Configs;
using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure
{
    public class MicroContext : DbContext
    {
        public MicroContext(DbContextOptions<MicroContext> options) : base(options) { }

        public DbSet<Cuenta> Cuentas { get; set; }
        public DbSet<Movimiento> Movimientos{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new CuentaConfig());
            modelBuilder.ApplyConfiguration(new MovimientoConfig());
        }
    }
}
