using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Models
{
    public class UserInvoice : BaseEntity
    {
        public UserInvoice()
        {
            LastEditedTime = CreatedDate = DateTime.Now;
        }

        public int InvoiceId { get; set; }
        public int UserTableId { get; set; }
        public int StatusId { get; set; }
        public string Note { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastEditedTime { get; set; }
        public bool? isDelete { get; set; }
        public string rejectReason { get; set; }
        public bool isReject { get; set; }

        public virtual Invoice Invoice { get; set; }
        public virtual Status Status { get; set; }
        public virtual UserTable UserTable { get; set; }
    }
}
