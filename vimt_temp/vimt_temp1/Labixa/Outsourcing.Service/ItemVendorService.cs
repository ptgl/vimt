using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Outsourcing.Data.Models;
using Outsourcing.Data.Repository;
using Outsourcing.Data.Infrastructure;
using Outsourcing.Data.Repository;

//Linh
namespace Outsourcing.Service
{
    public interface IItemVendorService
    {
        #region [Basic Method]
        /// <summary>
        /// 
        /// </summary>
        /// <returns>return list of ItemVendors</returns>
        IEnumerable<ItemVendor> GetAllItemVendors();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns> return a ItemVendor</returns>
        ItemVendor GetItemVendorById( int id);
        /// <summary>
        ///
        /// </summary>
        /// <param name="ItemVendor"></param>
        void AddItemVendor(ItemVendor ItemVendor);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ItemVendor"></param>
        void EditItemVendor(ItemVendor ItemVendor);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ItemVendor"></param>
        void DeleteItemVendor(ItemVendor ItemVendor);
        #endregion
    }

    public class ItemVendorService : IItemVendorService
    {
        #region[Fields]
        private readonly IItemVendorRepository _itemvendorRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public ItemVendorService(IItemVendorRepository _itemvendorRepository, IUnitOfWork _unitOfWork) 
        {
            this._itemvendorRepository = _itemvendorRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion

        public  IEnumerable<ItemVendor> GetAllItemVendors()
        {
            return _itemvendorRepository.GetAll().Where(p=>p.isDelete == false);
        }

        public ItemVendor GetItemVendorById(int id)
        {
            var obj = _itemvendorRepository.Get(p => p.Id == id && p.isDelete == false);
            return obj;
        }

        public void AddItemVendor(ItemVendor ItemVendor)
        {
            //ItemVendor.Note = "0";
            ItemVendor.isDelete = false;
            _itemvendorRepository.Add(ItemVendor);
            _unitOfWork.Commit();
        }

        public void EditItemVendor(ItemVendor ItemVendor)
        {
            
            _itemvendorRepository.Update(ItemVendor);
            _unitOfWork.Commit();
        }

        public void DeleteItemVendor(ItemVendor ItemVendor)
        {
            //_itemvendorRepository.Delete(ItemVendor);

            //   //vendor.note = "true";
            ////EditVendor(vendor);

            //vendor.Note = "true";
            //_vendorRepository.Update(vendor);
            //_unitOfWork.Commit();

            //ItemVendor.Note = "1";// 1 delete; 0 available
            ItemVendor.isDelete = true;
            _itemvendorRepository.Update(ItemVendor);
            _unitOfWork.Commit();
        }
    }
}
