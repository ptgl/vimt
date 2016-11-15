using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Models;
using Outsourcing.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Repository;

namespace Outsourcing.Service
{
    public interface IMSSCService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<MSSC> GetAllMSSCs();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a MSSC</returns>
        MSSC GetMSSCById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void AddMSSC(MSSC mssc);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void EditMSSC(MSSC mssc);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void DeleteMSSC(MSSC mssc);
        #endregion

    }

    public class MSSCService : IMSSCService
    {
        #region[Fields]
        private readonly IMSSCRepository _msscRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public MSSCService(IMSSCRepository _msscRepository, IUnitOfWork _unitOfWork)
        {
            this._msscRepository = _msscRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion

        public IEnumerable<MSSC> GetAllMSSCs()
        {
            return _msscRepository.GetAll();
        }

        public MSSC GetMSSCById(int id)
        {
            var obj = _msscRepository.Get(c => c.Id == id);
            //var obj = _roleGroupRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _roleGroupRepository.GetById(id);
            //var obj = _roleGroupRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void AddMSSC(MSSC mssc)
        {
            //roleGroup.Note = "0";
            mssc.isDelete = false;
            _msscRepository.Add(mssc);
            _unitOfWork.Commit();
        }

        public void EditMSSC(MSSC mssc)
        {

            //roleGroup.isDelete = false;
            _msscRepository.Update(mssc);
            _unitOfWork.Commit();
        }

        public void DeleteMSSC(MSSC mssc)
        {
            //roleGroup.Note = "1";
            mssc.isDelete = true;
            _msscRepository.Update(mssc);
            _unitOfWork.Commit();
        }
    }
}
