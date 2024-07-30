using MicroCuentas.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure.Configs
{
    public class MovimientoConfig : IEntityTypeConfiguration<Movimiento>
    {
        public void Configure(EntityTypeBuilder<Movimiento> builder)
        {
            builder.ToTable("Movimiento");
            builder.Property(x => x.id).HasColumnName("id");
            builder.Property(x => x.tipoMovimiento).HasColumnName("tipoMovimiento");
            builder.Property(x => x.saldo).HasColumnName("saldo");
            builder.Property(x => x.cuentaId).HasColumnName("cuentaId");
            builder.Property(x => x.fecha).HasColumnName("fecha");
            builder.Property(x => x.valor).HasColumnName("valor");
        }
    }
}
