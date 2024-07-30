﻿namespace MicroClientes.Domain.Entities
{
    public class Cliente
    {
        public int id {  get; set; }
        public string password { get; set; }
        public bool estado { get; set; }
        public int personaId { get; set; }
        public Persona? persona { get; set; }
    }
}
