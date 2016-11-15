using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;


namespace Outsourcing.Data.Models
{
   public class ItemVendor : BaseEntity
    {
       public ItemVendor()
        {
            LastEditedTime = DateTime.Now;
        }

        public int VendorId { get; set; }
        public string ItemName { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public string Note { get; set; }
        public bool? isDelete { get; set; }
        public DateTime? LastEditedTime { get; set; }

        public virtual Vendor Vendor { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }

    }
}
