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
    public interface IUserTableService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<UserTable> GetAllUsers();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        UserTable GetUserById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        void Adduser(UserTable user);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        void EditUser(UserTable user);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        void DeleteUser(UserTable user);
        #endregion

    }

    public class UserTableService : IUserTableService
    {
        #region[Fields]
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public UserTableService(IUserRepository _userRepository, IUnitOfWork _unitOfWork)
        {
            this._userRepository = _userRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion

        public IEnumerable<UserTable> GetAllUsers()
        {
            return _userRepository.GetAll().Where(p=>p.isDelete == false);
        }

        public UserTable GetUserById(int id)
        {
            var obj = _userRepository.Get(c => c.Id == id && c.isDelete == false);
            //var obj = _userRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _userRepository.GetById(id);
            //var obj = _userRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void Adduser(UserTable user)
        {
            _userRepository.Add(user);
            _unitOfWork.Commit();
        }

        public void EditUser(UserTable user)
        {
            _userRepository.Update(user);
            _unitOfWork.Commit();
        }

        public void DeleteUser(UserTable user)
        {
            _userRepository.Delete(user); //xoa luon ca record trong db


            //vendor.note = "true";
            //EditVendor(vendor);

            //user.Note = "true";
            //_userRepository.Update(vendor);
            //_unitOfWork.Commit();
        }
    }
}
