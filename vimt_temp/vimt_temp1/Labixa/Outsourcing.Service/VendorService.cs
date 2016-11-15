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
    public interface IVendorService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<Vendor> GetAllVendors();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a vendor</returns>
        Vendor GetVendorById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="vendor"></param>
        void Addvendor(Vendor vendor);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="vendor"></param>
        void EditVendor(Vendor vendor);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="vendor"></param>
        void DeleteVendor(Vendor vendor);
        #endregion

    }
    public class VendorService : IVendorService
    {
        #region[Fields]
        private readonly IVendorRepository _vendorRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public VendorService(IVendorRepository _vendorRepository, IUnitOfWork _unitOfWork)
        {
            this._vendorRepository = _vendorRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion
        public Vendor GetVendorById(int id)
        {
            var obj = _vendorRepository.Get(c => c.Id == id);
            //var obj = _vendorRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _vendorRepository.GetById(id);
            //var obj = _vendorRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void Addvendor(Vendor vendor)
        {
            
            vendor.isDelete = false;         
            _vendorRepository.Add(vendor);         
            _unitOfWork.Commit();
        }

        public void EditVendor(Vendor vendor)
        {

            //vendor.isDelete = false;
            _vendorRepository.Update(vendor);
            _unitOfWork.Commit();
        }

        public void DeleteVendor(Vendor vendor)
        {
            //_vendorRepository.Delete(vendor); //xoa luon ca record trong db 1 delete 0 available


            //vendor.note = "true";
            //EditVendor(vendor);

            
            vendor.isDelete = true;
            _vendorRepository.Update(vendor);
            _unitOfWork.Commit();
        }

        public IEnumerable<Vendor> GetAllVendors()
        {
            return _vendorRepository.GetAll().Where(p=>p.isDelete == false);
        }
    }
}
