using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Models
{
    public class RoleGroup : BaseEntity
    {
        public string GroupName { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public bool? isDelete { get; set; }

        public virtual ICollection<UserTable> Users { get; set; }

    }
}
