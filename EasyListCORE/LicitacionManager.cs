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

            var crudLicitacion = LicitacionCrudFactory();

            var existLicitacion = crudLicitacion.RetrieveById<licitacion>(licitacion.idLicitacion);

            if(existLicitacion != null )
            {
                throw new Exception("Este ID de licitacion ya existe");
            }

            //TXT
            var Text = $"Licitacion: {licitacion.idLicitacion}, titulo: {licitacion.titulo}, descripcion: {licitacion.descripcion}, estado: {licitacion.estado}, " +
                $"fechaMaxOferta: {licitacion.fechaMaxOferta}, fechaMaxEntrega: {licitacion.fechaMaxEntrega}, presupuesto: {licitacion.presupuesto}, " +
                $"codigoQr: {licitacion.codigoQr}, automatica: {licitacion.automatica}";
            FileDAO.SaveText(Text);

            //Se envia a crear a la base de datos
            crudLicitacion.Create(licitacion);
        }

    }

}
