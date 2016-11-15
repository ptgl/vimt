using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;
using Outsourcing.Data.Repository;
using Outsourcing.Data.Infrastructure;
namespace Outsourcing.Service
{
    public interface IUserInvoiceService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<UserInvoice> GetAllUserInvoices();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a vendor</returns>
        UserInvoice GetUserInvoiceById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void AddUserInvoice(UserInvoice UserInvoice);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void EditUserInvoice(UserInvoice UserInvoice);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void DeleteUserInvoice(UserInvoice UserInvoice);
        #endregion

    }
    public class UserInvoiceService : IUserInvoiceService
    {
        #region[Fields]
     
        private readonly IUserInvoiceRepository _userInvoiceRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public UserInvoiceService( IUnitOfWork _unitOfWork, IUserInvoiceRepository _userInvoiceRepositor2)
        {
            this._unitOfWork = _unitOfWork;
            this._userInvoiceRepository = _userInvoiceRepositor2;
        }
        #endregion



        public IEnumerable<UserInvoice> GetAllUserInvoices()
        {
            return _userInvoiceRepository.GetAll().Distinct();
        }

        public UserInvoice GetUserInvoiceById(int id)
        {
            var obj = _userInvoiceRepository.Get(c => c.Id == id);
            return obj;
        }

        public void AddUserInvoice(UserInvoice UserInvoice)
        {
            //UserInvoice.isDelete = false;
           // UserInvoice.isReject = false;
            _userInvoiceRepository.Add(UserInvoice);
            _unitOfWork.Commit();
        }

        public void EditUserInvoice(UserInvoice UserInvoice)
        {
            _userInvoiceRepository.Update(UserInvoice);
            _unitOfWork.Commit();
        }

        public void DeleteUserInvoice(UserInvoice UserInvoice)
        {
            UserInvoice.isDelete = true;
            _userInvoiceRepository.Update(UserInvoice);
            _unitOfWork.Commit();
           
        }
    }
}
