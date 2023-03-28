using DTOs;
using EasyListDataAccess.CRUD;
using EasyListDataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListCORE
{
    public class LicitacionManager
    {

        public LicitacionManager() { }

        //Create manager

        public void Create(Licitacion licitacion)
        {

            //Valido que exista el idLicitacion

            var crudLicitacion = new LicitacionCrudFactory();

            var existLicitacion = crudLicitacion.RetrieveById<Licitacion>(licitacion.idLicitacion);

            if(existLicitacion != null )
            {
                throw new Exception("Este ID de licitacion ya existe");
            }

            //TXT
            var Text = $"Licitacion: {licitacion.idLicitacion}, titulo: {licitacion.titulo}, descripcion: {licitacion.descripcion}, estado: {licitacion.estado}, " +
                $"fechaMaxOferta: {licitacion.fechaMaxOferta}, fechaMaxEntrega: {licitacion.fechaMaxEntrega}, presupuesto: {licitacion.presupuesto}, " +
                $"codigoQr: {licitacion.codigoQr}, automatica: {licitacion.automatica}," +
                $"idAnalista: {licitacion.idAnalista}, idOferta: {licitacion.idOferta}";
            FileDAO.SaveText(Text);

            //Se envia a crear a la base de datos
            crudLicitacion.Create(licitacion);

        }

        //Update manager

        public void Update(Licitacion licitacion)
        {
            var crudLicitacion = new LicitacionCrudFactory();
            var existLicitacion = crudLicitacion.RetrieveById<Licitacion>(licitacion.idLicitacion);

            if(existLicitacion == null )
            {
                throw new Exception("Licitacion does not exist!");
            }

            crudLicitacion.Update(licitacion);

        }
        
        //Retrieve by ID

        public Licitacion RetrieveById(int idLicitacion)
        {
            var crudLicitacion = new LicitacionCrudFactory();
            var existLicitacion = crudLicitacion.RetrieveById<Licitacion>(idLicitacion);

            if(existLicitacion == null )
            {
                throw new Exception("Licitacion does not exist!");
            }

            return existLicitacion;

        }

        //Retrieve All

        public List<Licitacion> RetrieveAll()
        {
            var crudLicitacion = new LicitacionCrudFactory();
            return crudLicitacion.RetrieveAll<Licitacion>();
        }

    }

}
