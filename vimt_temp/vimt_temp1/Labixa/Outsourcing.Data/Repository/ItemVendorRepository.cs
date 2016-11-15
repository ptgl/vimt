using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Repository
{
    public class ItemVendorRepository : RepositoryBase< ItemVendor>, IItemVendorRepository
    {
        public ItemVendorRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
    public interface IItemVendorRepository : IRepository<ItemVendor>
    {

    }
}
