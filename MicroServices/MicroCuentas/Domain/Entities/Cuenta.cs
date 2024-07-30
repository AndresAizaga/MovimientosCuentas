namespace MicroCuentas.Domain.Entities
{
    public class Cuenta
    {
        public int id { get; set; }
        public int clienteId { get; set; }
        public string numeroCuenta { get; set; }
        public string tipoCuenta { get; set; }
        public decimal saldoInicial { get; set; }
        public bool estado { get; set; }
    }
}
