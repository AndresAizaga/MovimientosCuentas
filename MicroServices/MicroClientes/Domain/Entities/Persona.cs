﻿namespace MicroClientes.Domain.Entities
{
    public class Persona
    {
        public int id {  get; set; }
        public string nombre { get; set; }
        public int edad { get; set; }
        public string genero { get; set; }
        public string identificacion { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
    }
}