using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Data.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Labixa.Areas.Admin.ViewModel
{
    public class InvoiceViewModel
    {
        public InvoiceViewModel()
        {
            ListVendors = new List<SelectListItem>();
            ListItemVendors = new List<SelectListItem>();
            URL = "";
        }

        public int Id {get; set;}
        public string Description { get; set; } // invoice ID
        public string Note { get; set; }
        public bool IsCDS { get; set; }
        public int? paymentId { get; set; }
        public double totalPayment { get; set; }
        public string requestID { get; set; }
        public int ItemVendorId { get; set; }
        public int VendorId { get; set; }
        public int Id_of_Invoice { get; set; }

        public string recentStatus { get; set; }
        public bool? isDelete { get; set; }
        public string rejectReason {get; set;}
        public int UserTableId { get; set; }
        public int quantity { get; set; }

       
        public string InvoiceId { get; set; } // accountant input

        public int PaymentVoucher { get; set; }
        public double PaymentAmount { get; set; }
        public DateTime PaymentCreatedDate { get; set; }
        public DateTime PaymentLastEditedTime { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string wwidManager { get; set; }


     //   [ValidateFile(ErrorMessage = "Invalid file type!")]
        public HttpPostedFileBase file { get; set; }
        public string fileName { get; set; }
        public string URL { get; set; }

        public string option { get; set; }
        public bool approve { get; set; }

        public virtual ICollection<UserInvoice> UserInvoices { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
        public IEnumerable<SelectListItem> ListVendors { get; set; }
        public IEnumerable<SelectListItem> ListItemVendors { get; set; }
        public List<SelectListItem> ListOptions { get; set; }

        public List<Invoice> listInvoices { get; set; }
       // public List<int> listAmount { get; set; }
       public List<Status> listStatuses { get; set; }
    }



    //public class UploadViewModel
    //{
    //    [ValidateFile(ErrorMessage = "Invalid file type!")]
    //    public HttpPostedFileBase file { get; set; }
    //}

    //public class FileViewModel
    //{
    //    public string fileName { get; set; }
    //}  







}