using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Models;
using Outsourcing.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Outsourcing.Service
{
    public interface IStatusService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<Status> GetAllStatuses();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a Status</returns>
        Status GetStatusById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="status"></param>
        void AddStatus(Status status);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="status"></param>
        void EditStatus(Status status);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="status"></param>
        void DeleteStatus(Status status);
        #endregion

    }

    public class StatusService : IStatusService
    {
        #region[Fields]
        private readonly IStatusRepository _statusRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public StatusService(IStatusRepository _statusRepository, IUnitOfWork _unitOfWork)
        {
            this._statusRepository = _statusRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion

        public IEnumerable<Status> GetAllStatuses()
        {
            return _statusRepository.GetAll();
        }

        public Status GetStatusById(int id)
        {
            var obj = _statusRepository.Get(c => c.Id == id);
            return obj;
        }

        public void AddStatus(Status status)
        {
            //status.Note = "0";
            status.isDelete = false;
            _statusRepository.Add(status);
            _unitOfWork.Commit();
        }

        public void EditStatus(Status status)
        {
           
            //status.isDelete = false;
            _statusRepository.Update(status);
            _unitOfWork.Commit();
        }

        public void DeleteStatus(Status status)
        {
            //status.Note = "1";
            status.isDelete = true;
            _statusRepository.Update(status);
            _unitOfWork.Commit();
        }
    }
}
