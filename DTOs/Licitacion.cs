using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class Licitacion : BaseEntity
    {

        public Licitacion() { }

        //Atributos de la Licitacion

        public enum Status { ABIERTA, CERRADA, ENPROCESO, TERMINADA, ELIMINADA }

        public string titulo { get; set; }
        public string descripcion { get; set; }
        public Status estado { get; set; }
        public DateTime fechaMaxOferta { get; set; }
        public DateTime fechaMaxEntrega { get; set; }
        public float presupuesto { get; set; }
        public string codigoQr { get; set; }
        public bool automatica { get; set; }

        //Asociacion con las clases Analista y Oferta

        public int idAnalista { get; set; }
        public int? idOferta { get; set; }

    }

}
