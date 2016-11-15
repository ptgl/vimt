using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Outsourcing.Data.Models
{
    public class Invoice : BaseEntity
    {
        public Invoice()
        {
            PaymentLastEditedTime = PaymentCreatedDate = DateTime.Now;
        }

        
        public bool IsCDS { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public int? paymentId { get; set; }
        public double totalPayment { get; set; }
        public string requestID { get; set; }
        public bool? isDelete { get; set; }

        public int PaymentVoucher { get; set; }
        public double PaymentAmount { get; set; }
        public DateTime PaymentCreatedDate { get; set; }
        public DateTime PaymentLastEditedTime { get; set; }
        public string URL { get; set; }
        public string optionA { get; set; }
        public string optionB { get; set; }

        public int MsscID { get; set; }

        public virtual ICollection<UserInvoice> UserInvoices { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
        public virtual MSSC MSSC { get; set; }
    }
}
