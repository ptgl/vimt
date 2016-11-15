using Outsourcing.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Outsourcing.Data.Models
{
    public class InvoiceItem : BaseEntity
    {
        
        public int InvoiceId { get; set; }
        public int ItemVendorId { get; set; }
        public string Note { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double totalPrice { get; set; }
        public bool? isDelete { get; set; }

        public virtual ItemVendor ItemVendor { get; set; }
        
    }
}
