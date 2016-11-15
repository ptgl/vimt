using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Models;

namespace Outsourcing.Data.Repository
{
    public class MSSCRepository : RepositoryBase<MSSC>, IMSSCRepository
    {
        public MSSCRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
    public interface IMSSCRepository : IRepository<MSSC>
    {

    }
}
