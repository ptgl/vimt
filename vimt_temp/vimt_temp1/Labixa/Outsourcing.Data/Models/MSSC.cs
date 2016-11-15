using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Outsourcing.Data.Models
{
    public class MSSC : BaseEntity
    {
        public MSSC()
        {
            Date =  DateTime.Now;
        }

        public string GLAC { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public bool? isDelete { get; set; }
        public string Note { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }

    }
}
