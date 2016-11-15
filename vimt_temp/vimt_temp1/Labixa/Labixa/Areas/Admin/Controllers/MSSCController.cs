using Outsourcing.Data.Models;
using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Labixa.Areas.Admin.Controllers
{
    public class MSSCController : Controller
    {

        #region [Field]
       
        public readonly IInvoiceService _invoiceService;
        public readonly IMSSCService _msscService;
        public readonly IStatusService _statusService;
        #endregion
        #region [ctor]
        public MSSCController(IInvoiceService _invoiceService, IMSSCService _msscService, IStatusService _statusService)
        {
           
            this._invoiceService = _invoiceService;
            this._msscService = _msscService;
            this._statusService = _statusService;
        }
        #endregion


        //
        // GET: /Admin/MSSC/
        public ActionResult Index()
        {
            Session["amount"] = null;
            Session["date"] = null;
            Session["GLAC"] = null;
            ViewBag.message = null;
            return View();
        }

        public ActionResult ShowInvAjax(string amount, DateTime end, string GLAC)
        {
            Session["amount"] = amount;
            Session["date"] = end;
            Session["GLAC"] = GLAC;
            var mssc = _msscService.GetAllMSSCs().FirstOrDefault();
            var status = _statusService.GetAllStatuses().Where(p=>p.StatusName.ToString().ToLower().Equals("done")).FirstOrDefault();
            //var listInv = _invoiceService.GetAllInvoices().Where(p=>p.MsscID == 2 && p.UserInvoices.LastOrDefault().StatusId == int.Parse(status.Id.ToString()));
            var listInv = _invoiceService.GetAllInvoices().Where(p=>p.MsscID == 2);


            List<Invoice> listinvoice = new List<Invoice>();

            foreach (var item in listInv)
            {
                var InvDate = item.UserInvoices.FirstOrDefault().CreatedDate;
                if ( InvDate <= end.AddDays(1))
                {
                    listinvoice.Add(item);
                }

            }

            return PartialView("_TableInvoice", listinvoice);
        }

        
        public ActionResult Save()
        {
            string key = "";
            HttpCookie cookie = Request.Cookies["_listInvId"];
            if(cookie != null)
            {
                key = cookie.Value;
                cookie.Value = null;
                cookie.Expires = DateTime.Now.AddYears(-1);
                Response.Cookies.Add(cookie);
            }

            if(key.Equals(""))
            {
                ViewBag.message = "Cookie Error. Please try again";
                Session["amount"] = null;
                Session["date"] = null;
                Session["GLAC"] = null;
                return View("Index");
            }

            key = key.Remove(key.Length - 1);

            string[] array = key.Split('|');

            MSSC mc = new MSSC();
         var amount =   Session["amount"];
          var date =  Session["date"];
           var glac = Session["GLAC"];

           mc.Amount = double.Parse(amount.ToString());
           mc.Date = (DateTime)date;
           mc.GLAC = glac.ToString();
           _msscService.AddMSSC(mc);

           int IDMSSC = _msscService.GetAllMSSCs().LastOrDefault().Id;

            foreach(string item in array)
            {
                  int id = int.Parse(item);
                  Invoice inv = _invoiceService.GetInvoiceById(id);
                   inv.MsscID = IDMSSC;
                   _invoiceService.EditInvoice(inv);
            }


            Session["amount"] = null;
            Session["date"] = null;
            Session["GLAC"] = null;
          

            return RedirectToAction("ViewPaymentDashboard", "Invoice");
        }



	}
}