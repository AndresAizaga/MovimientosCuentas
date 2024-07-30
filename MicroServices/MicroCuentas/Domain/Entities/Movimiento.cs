namespace MicroCuentas.Domain.Entities
{
    public class Movimiento
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public string tipoMovimiento { get; set; }
        public decimal valor { get; set; }
        public decimal saldo { get; set; }
        public int cuentaId { get; set; }
        public Cuenta? cuenta { get; set; }
    }
}
