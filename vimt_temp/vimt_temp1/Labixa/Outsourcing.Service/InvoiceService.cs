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
    public interface IInvoiceService
    {
        #region [basic Method]
        /// <summary>
        /// 
        /// </summary>
        IEnumerable<Invoice> GetAllInvoices();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return list invoices that isn't deleted</returns>
        IEnumerable<Invoice> GetAllInvoicesReport();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>return all invoices for reporting</returns>
        Invoice GetInvoiceById(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void AddInvoice(Invoice invoice);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void EditInvoice(Invoice invoice);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Invoice"></param>
        void DeleteInvoice(Invoice invoice);
        #endregion


   
    }
    public class InvoiceService : IInvoiceService
    {
        #region[Fields]
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMSSCRepository _msscRepository;
        private readonly IInvoiceItemRepository _invoiceItemRepository;
        private readonly IUserInvoiceRepository _userInvoiceRepository;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region [Ctor]
        public InvoiceService(IMSSCRepository _msscRepository, IInvoiceRepository _invoiceRepository, IUnitOfWork _unitOfWork, IInvoiceItemRepository _invoiceItemRepository,
            IUserInvoiceRepository _userInvoiceRepository)
        {
            this._invoiceRepository = _invoiceRepository;
            this._unitOfWork = _unitOfWork;
            this._invoiceItemRepository = _invoiceItemRepository;
            this._userInvoiceRepository = _userInvoiceRepository;
            this._msscRepository = _msscRepository;
        }
        #endregion


        public IEnumerable<Invoice> GetAllInvoices()
        {
            return _invoiceRepository.GetAll().Where(p => p.isDelete == false);
        }

        public IEnumerable<Invoice> GetAllInvoicesReport()
        {
            return _invoiceRepository.GetAll();
        }

        public Invoice GetInvoiceById(int id)
        {
            var obj = _invoiceRepository.Get(c => c.Id == id && c.isDelete == false);
            //var obj = _vendorRepository.GetAll().Where(p=>p.Id==id).FirstOrDefault();
            //var obj = _vendorRepository.GetById(id);
            //var obj = _vendorRepository.GetMany(p => p.Id == id).FirstOrDefault();
            return obj;
        }

        public void AddInvoice(Invoice invoice)
        {
           string YY = DateTime.Now.Year.ToString().Substring(2, 2);
           invoice.requestID = "IN"+ YY + (_invoiceRepository.GetAll().LastOrDefault().Id + 1).ToString("0000");
           invoice.isDelete = false;
           invoice.IsCDS = false;
           invoice.URL = "";
           invoice.MsscID = _msscRepository.GetAll().FirstOrDefault().Id;
            _invoiceRepository.Add(invoice);
            _unitOfWork.Commit();
        }

        public void EditInvoice(Invoice invoice)
        {
            _invoiceRepository.Update(invoice);
            _unitOfWork.Commit();
        }

        public void DeleteInvoice(Invoice invoice)
        {
            invoice.isDelete = true;
            invoice.UserInvoices.FirstOrDefault().isDelete = true;
           _invoiceRepository.Update(invoice);
           _unitOfWork.Commit();
           int idInvoice = invoice.Id;

           #region [delete]
           var listItemInvoice = _invoiceItemRepository.GetMany(p => p.InvoiceId == idInvoice);
           foreach (var item in listItemInvoice)
           {
               item.Note = "1";
               _invoiceItemRepository.Update(item);
               _unitOfWork.Commit();
           }
           #endregion
           //var listUservoice = _userInvoiceRepository.GetAll().Where(p => p.InvoiceId == idInvoice);
           //foreach (var item in listUservoice)
           //{
           //    item.Note = "1";
           //    _userInvoiceRepository.Update(item);
           //    _unitOfWork.Commit();
           //}

            
        }

        
    }
}
