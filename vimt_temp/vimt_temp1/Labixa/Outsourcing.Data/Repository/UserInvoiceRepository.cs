using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Repository
{
    public class UserInvoiceRepository : RepositoryBase<UserInvoice>, IUserInvoiceRepository
    {
        public UserInvoiceRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
    public interface IUserInvoiceRepository : IRepository<UserInvoice>
    {

    }
}
