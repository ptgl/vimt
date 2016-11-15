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
    public interface IRoleGroupService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<RoleGroup> GetAllRoleGroups();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a RoleGroup</returns>
        RoleGroup GetRoleGroupById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void AddRoleGroup(RoleGroup roleGroup);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void EditRoleGroup(RoleGroup roleGroup);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleGroup"></param>
        void DeleteRoleGroup(RoleGroup roleGroup);
        #endregion

    }

    public class RoleGroupService : IRoleGroupService
    {
        #region[Fields]
        private readonly IRoleGroupRepository _roleGroupRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public RoleGroupService(IRoleGroupRepository _roleGroupRepository, IUnitOfWork _unitOfWork)
        {
            this._roleGroupRepository = _roleGroupRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion

        public IEnumerable<RoleGroup> GetAllRoleGroups()
        {
            return _roleGroupRepository.GetAll();
        }

        public RoleGroup GetRoleGroupById(int id)
        {
            var obj = _roleGroupRepository.Get(c => c.Id == id);
            //var obj = _roleGroupRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _roleGroupRepository.GetById(id);
            //var obj = _roleGroupRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void AddRoleGroup(RoleGroup roleGroup)
        {
            //roleGroup.Note = "0";
            roleGroup.isDelete = false;
            _roleGroupRepository.Add(roleGroup);
            _unitOfWork.Commit();
        }

        public void EditRoleGroup(RoleGroup roleGroup)
        {
           
            //roleGroup.isDelete = false;
            _roleGroupRepository.Update(roleGroup);
            _unitOfWork.Commit();
        }

        public void DeleteRoleGroup(RoleGroup roleGroup)
        {
            //roleGroup.Note = "1";
            roleGroup.isDelete = true;
            _roleGroupRepository.Update(roleGroup);
            _unitOfWork.Commit();
        }
    }
}
