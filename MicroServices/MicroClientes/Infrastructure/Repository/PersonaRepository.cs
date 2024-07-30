﻿using MicroClientes.Domain.Entities;
using MicroClientes.Domain.Repository;

namespace MicroClientes.Infrastructure.Repository
{
    public class PersonaRepository : IRepositoryBase<Persona, int>
    {
        private MicroContext context;

        public PersonaRepository(MicroContext context)
        {
            this.context = context;
        }


        public int Count => this.context.Personas.Count();

        public Persona AddEntity(Persona entity)
        {
            this.context.Personas.Add(entity);
            this.context.SaveChanges();
            return entity;
        }

        public void Delete(int entityId)
        {
            var entity = this.context.Personas.Find(entityId);
            if (entity != null)
            {
                this.context.Personas.Remove(entity);
                this.context.SaveChanges();
            }
        }

        public void EditEntity(Persona entity)
        {
            this.context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.context.SaveChanges();
        }

        public Persona? GetEntityById(int entityId) =>
            this.context.Personas.Find(entityId) ?? null;

        public List<Persona> ListEntity() =>
            this.context.Personas.ToList();
    }
}
