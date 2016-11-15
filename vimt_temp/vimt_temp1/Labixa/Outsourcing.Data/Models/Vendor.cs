using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;


namespace Outsourcing.Data.Models
{
    public class Vendor : BaseEntity
    {
        public string VendorName { get; set; }
        public string Address { get; set; }
        public string TaxCode { get; set; }
        public string Note { get; set; }
        public bool? isDelete { get; set; }

        public virtual ICollection<ItemVendor> ItemVendors { get; set; }
    }
}
