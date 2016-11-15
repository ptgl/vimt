using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Models
{
    public class UserTable : BaseEntity
    {
        public string UserName { get; set; }
        public int WWID { get; set; }
        public string Note { get; set; }
        public int RoleGroupId { get; set; }
        public bool? isDelete { get; set; }

        public virtual ICollection<UserInvoice> UserInvoices { get; set; }
        public virtual RoleGroup RoleGroup { get; set; }
    }
}
