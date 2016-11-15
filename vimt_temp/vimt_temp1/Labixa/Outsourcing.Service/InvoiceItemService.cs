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
    public interface IInvoiceItemService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<InvoiceItem> GetAllInvoiceItems();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return a vendor</returns>
        InvoiceItem GetInvoiceItemById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="invoiceItem"></param>
        void AddInvoiceItem(InvoiceItem invoiceItem);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="invoiceItem"></param>
        void EditInvoiceItem(InvoiceItem invoiceItem);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="invoiceItem"></param>
        void DeleteInvoiceItem(InvoiceItem invoiceItem);
        #endregion

    }
    public class InvoiceItemService : IInvoiceItemService
    {
        #region[Fields]
        private readonly IInvoiceItemRepository _invoiceItemRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public InvoiceItemService(IInvoiceItemRepository _invoiceItemRepository, IUnitOfWork _unitOfWork)
        {
            this._invoiceItemRepository = _invoiceItemRepository;
            this._unitOfWork = _unitOfWork;
        }
        #endregion
        public InvoiceItem GetInvoiceItemById(int id)
        {
            var obj = _invoiceItemRepository.Get(c => c.Id == id);
            //var obj = _vendorRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _vendorRepository.GetById(id);
            //var obj = _vendorRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void AddInvoiceItem(InvoiceItem invoiceItem)
        {
            //invoiceItem.Note = "0";
            invoiceItem.isDelete = false;
            _invoiceItemRepository.Add(invoiceItem);
            _unitOfWork.Commit();
        }

        public void EditInvoiceItem(InvoiceItem invoiceItem)
        {
          
            //invoiceItem.isDelete = false;
            _invoiceItemRepository.Update(invoiceItem);
            _unitOfWork.Commit();
        }

        public void DeleteInvoiceItem(InvoiceItem invoiceItem)
        {
            //_vendorRepository.Delete(vendor); //xoa luon ca record trong db 1 delete 0 available


            //vendor.note = "true";
            //EditVendor(vendor);

            //invoiceItem.Note = "1";
            invoiceItem.isDelete = true;
            _invoiceItemRepository.Update(invoiceItem);
            _unitOfWork.Commit();
        }

        public IEnumerable<InvoiceItem> GetAllInvoiceItem()
        {
            return _invoiceItemRepository.GetAll();
        }

        public IEnumerable<InvoiceItem> GetAllInvoiceItems()
        {
            return _invoiceItemRepository.GetAll();
        }


    }
}
