using MicroCuentas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MicroCuentas.Infrastructure.Configs
{
    public class CuentaConfig : IEntityTypeConfiguration<Cuenta>
    {
        public void Configure(EntityTypeBuilder<Cuenta> builder)
        {
            builder.ToTable("Cuenta");
            builder.Property(x => x.id).HasColumnName("id");
            builder.Property(x => x.numeroCuenta).HasColumnName("numeroCuenta");
            builder.Property(x => x.tipoCuenta).HasColumnName("tipoCuenta");
            builder.Property(x => x.clienteId).HasColumnName("clienteId");
            builder.Property(x => x.saldoInicial).HasColumnName("saldoInicial");
            builder.Property(x => x.estado).HasColumnName("estado");
        }
    }
}
