using MicroClientes.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Numerics;

namespace MicroClientes.Infrastructure.Configs
{
    public class ClienteConfig : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("Cliente");
            builder.Property(x => x.id).HasColumnName("id");
            builder.Property(x => x.password).HasColumnName("password");
            builder.Property(x => x.estado).HasColumnName("estado");
        }
    }
}
