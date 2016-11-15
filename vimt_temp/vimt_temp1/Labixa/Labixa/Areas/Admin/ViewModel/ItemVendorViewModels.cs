using Outsourcing.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Labixa.Areas.Admin.ViewModel
{
    public class ItemVendorViewModels
    {
        public ItemVendorViewModels()
        {
            ListVendors = new List<SelectListItem>();
        }

        public int ID { get; set; }

        [DisplayName(@"Vendor ")]
        public int VendorId { get; set; }

        [DisplayName(@"Item name")]
        public string ItemName { get; set; }
        [DisplayName(@"Price")]
        public double Price { get; set; }
        [DisplayName(@"Unit")]
        public string Unit { get; set; }
        public string Note { get; set; }
        public bool? isDelete { get; set; }
        public virtual Vendor Vendor { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
        public IEnumerable<SelectListItem> ListVendors { get; set; }
 
    }
}