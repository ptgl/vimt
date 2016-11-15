using Outsourcing.Service;
using Outsourcing.Data.Models;
using System;
using System.Collections.Generic;
using Labixa.Areas.Admin.ViewModel;
using Labixa.Models;
using System.Net.Mail;
using Outsourcing.Core.Extensions;
using AutoMapper;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Core.Common;
using System.IO;
using System.Net.Mime;


namespace Labixa.Areas.Admin.Controllers
{
    public class InvoiceController : Controller
    {

        #region [Field]
        public readonly IVendorService _vendorService;
        public readonly IInvoiceService _invoiceService;
        public readonly IInvoiceItemService _invoiceItemService;
        public readonly IItemVendorService _itemVendorService;
        public readonly IUserTableService _userTableService;
        public readonly IUserInvoiceService _userInvoiceService;
        public readonly IStatusService _statusService;
        public readonly IRoleGroupService _roleGroupService;

        #endregion
        #region [ctor]
        public InvoiceController(IItemVendorService _itemVendorService, IVendorService _vendorService,
            IInvoiceItemService _invoiceItemService, IInvoiceService _invoiceService,
            IUserTableService _userTableService, IUserInvoiceService _userInvoiceService, IStatusService _statusService, IRoleGroupService _roleGroupService)
        {
            this._vendorService = _vendorService;
            this._invoiceItemService = _invoiceItemService;
            this._invoiceService = _invoiceService;
            this._itemVendorService = _itemVendorService;
            this._userTableService = _userTableService;
            this._userInvoiceService = _userInvoiceService;
            this._statusService = _statusService;
            this._roleGroupService = _roleGroupService;
            //System.Web.HttpContext.Current.Session["role"] = "requestor manager";
        }
        #endregion


        //
        // GET: /Admin/Invoice/
        public ActionResult Index()
        {
            if (Session["role"] != null)
            {
                
                var role = Session["role"].ToString();
                var wwid = Session["wwid"].ToString();
              //  var wwidManager = Session["ManagerWWID"].ToString();
              //  List<UserInvoice> UserInvoices = new List<UserInvoice>();

                var UserInvoices = _userInvoiceService.GetAllUserInvoices().Distinct();

                if (role.ToLower().Equals("requestor") )
                {
                    // nếu là requestor thì lấy invoice thuộc wwid của nó
                   
                   // UserInvoices = UserInvoices.Where(p => (p.UserTable.WWID.ToString().Equals(wwid)) && p.isDelete == false);

                    var listInv = _invoiceService.GetAllInvoices().Where(p => p.Note.ToString().Split('|').FirstOrDefault().Equals(wwid));

                    return View("Index", listInv.Distinct());

                }
                else if (role.ToLower().Equals("accountant"))
                {
                    var status1 = _statusService.GetAllStatuses().Where(p => p.Note.ToLower().Trim().Equals(role.ToLower().Trim())).FirstOrDefault();
                    var status2 = _statusService.GetAllStatuses().Where(p => p.StatusName.ToLower().Equals("pending for signature")).FirstOrDefault();
                    UserInvoices = UserInvoices.Where(p=>(p.StatusId == status1.Id || p.StatusId == status2.Id) && p.isDelete == false).Distinct();
                    
                }
                else if ( !role.ToLower().Equals("super user")) // remain except super user , requestor, accountant
                {

                    var status = _statusService.GetAllStatuses().Where(p => p.Note.ToLower().Trim().Equals(role.ToLower().Trim())).FirstOrDefault();
                    UserInvoices = UserInvoices.Where(p => p.StatusId == status.Id && p.isDelete == false);  
                 
                }
               

               
                List<Invoice> listInvoice = new List<Invoice>();
                foreach (var item in UserInvoices)
                {
                    Invoice obj = _invoiceService.GetInvoiceById(item.InvoiceId);
                    if (role.ToLower().Equals("requestor manager"))
                    {
                        if(obj.Note.Split('|').LastOrDefault().ToString().Equals(wwid))
                            listInvoice.Add(obj);
                    }
                    else
                    {
                        listInvoice.Add(obj);
                    }
                  
                }
                return View("Index", listInvoice.Distinct());


            }
            else
            {
                return RedirectToAction("Index", "Dashboard");
            }
        }





        /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/




        public ActionResult CreateVendor()
        {
            Session["listItem"] = null;
            Session["option"] = null;
            Session["InvoiceID"] = null;

            var session = Session["role"].ToString().ToLower();
            if (session.Equals("requestor") || session.Equals("super user") || session.Equals("accountant"))
            {
                //    var listItem = _itemVendorService.GetAllItemVendors().ToSelectListItems(-1);
                var listVendor = _vendorService.GetAllVendors().ToSelectListItems(-1);

                InvoiceViewModel obj = new InvoiceViewModel();
                obj.ListVendors = listVendor;

                List<SelectListItem> options = new List<SelectListItem>();
                options.Add(new SelectListItem { Text = "LE763", Value = "LE763" });
                options.Add(new SelectListItem { Text = "LE766", Value = "LE766" });
                obj.ListOptions = options;


                return View(obj);
            }
            else return Redirect("/Dashboard/Index");


        }

        //[HttpPost]
        //public ActionResult CreateVendor(InvoiceViewModel invoice)
        //{
            

        //    var role = Session["role"].ToString().ToLower();
        //    var requestorId = Session["wwid"].ToString();
        //    var requestorMail = Session["mail"].ToString();
        //    var managerId = Session["ManagerWWID"].ToString();

        //    Invoice inv = new Invoice();

        //    if (role.Equals("accountant"))
        //    {
        //        if (invoice.InvoiceId == null)
        //        {
        //            return Redirect("/Invoice/CreateVendor");
        //        }
        //        else
        //        {
        //            inv.Description = invoice.InvoiceId.ToString();
        //        }
        //    }


        //    inv.Note = requestorId + "|" + requestorMail + "|" + managerId;
        //    inv.PaymentVoucher = 0;
        //    inv.totalPayment = 0;
        //    inv.PaymentAmount = 0;
        //    inv.PaymentCreatedDate = DateTime.Now;
        //    inv.optionA = invoice.option.ToString();

        //    _invoiceService.AddInvoice(inv);

        //    UserInvoice userInv = new UserInvoice();

        //    if (role.Equals("requestor")  )
        //    {
        //        userInv.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("pending for approve")).FirstOrDefault().Id;
        //    }
        //    else if (role.Equals("accountant"))
        //    {
        //        userInv.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("pending for signature")).FirstOrDefault().Id;
                
        //    }
            

           






        //    var invoiceId = _invoiceService.GetAllInvoices().LastOrDefault().Id;
        //    var userId = _userTableService.GetAllUsers().Where(p => p.WWID == int.Parse(requestorId)).FirstOrDefault().Id;

        //    userInv.UserTableId = int.Parse(userId.ToString());
        //   // userInv.StatusId = statusId;
        //    userInv.InvoiceId = invoiceId;
        //    userInv.isDelete = false;
        //    _userInvoiceService.AddUserInvoice(userInv);

          
        //    var listItem = _itemVendorService.GetAllItemVendors().Where(p => p.VendorId == invoice.VendorId).ToSelectListItems(-1);
        //    invoice.Id_of_Invoice = invoiceId;
        //    invoice.ListItemVendors = listItem;

        //    return View("CreateItem",invoice);
        //}






        //=========================CreateVendor ver2==============================================


        [HttpPost]
        public ActionResult CreateVendor(InvoiceViewModel invoice)
        {
            var role = Session["role"].ToString().ToLower();
             if (role.Equals("accountant"))
             {
                 if (invoice.InvoiceId == null)
                 {
                     return Redirect("/Invoice/CreateVendor");
                 }
                 else
                 {
                     Session["InvoiceID"] = invoice.InvoiceId.ToString();
                 }
             }


           
            var listItem = _itemVendorService.GetAllItemVendors().Where(p => p.VendorId == invoice.VendorId).ToSelectListItems(-1);
                invoice.ListItemVendors = listItem;
                Session["option"] = invoice.option;
            return View("CreateItem", invoice);
        }




        //=======================================================================

        [HttpPost]
        public ActionResult CreateItemAjax(string invId, string Quan, string ItemId)
        {
            
            if (Session["listItem"] == null)
           {
               List<InvoiceItem> listinvoiceItem = new List<InvoiceItem>();
               Session["listItem"] = listinvoiceItem;
           }

           
                List<InvoiceItem> list = (List<InvoiceItem>)Session["listItem"];
                double unitPrice = 0;
            foreach(var obj in list)
            {
                if(obj.ItemVendorId.ToString().Equals(ItemId))
                {
                    unitPrice = _itemVendorService.GetItemVendorById(int.Parse(ItemId)).Price;
                    obj.Quantity += int.Parse(Quan);
                    obj.totalPrice = unitPrice * obj.Quantity;
                    Session["listItem"] = list;
                    return PartialView("_TableItemCreate", Session["listItem"]);
                }
            }

                unitPrice = _itemVendorService.GetItemVendorById(int.Parse(ItemId)).Price;
                InvoiceItem item = new InvoiceItem();
                item.Quantity = int.Parse(Quan);
                item.Description = _itemVendorService.GetItemVendorById(int.Parse(ItemId)).ItemName.ToString();
                item.ItemVendorId = int.Parse(ItemId);
                item.totalPrice = unitPrice * item.Quantity;
                list.Add(item);
                Session["listItem"] = list;


            return PartialView("_TableItemCreate", Session["listItem"]);
        }




        //[HttpPost]
        public ActionResult CreateInvoice()
        {

            List<InvoiceItem> listItem = (List<InvoiceItem>)Session["listItem"];
            if (listItem == null)
            {
                return RedirectToAction("CreateVendor");
            }
            var role = Session["role"].ToString().ToLower();
            var requestorId = Session["wwid"].ToString();
            var requestorMail = Session["mail"].ToString();
            var managerId = Session["ManagerWWID"].ToString();
           

            Invoice inv = new Invoice();
            inv.Note = requestorId + "|" + requestorMail + "|" + managerId;
            inv.PaymentVoucher = 0;
            inv.totalPayment = 0;
            inv.PaymentAmount = 0;
            inv.PaymentCreatedDate = DateTime.Now;
           // inv.optionA = invoice.option.ToString();
            inv.optionA = Session["option"].ToString();

            if (role.Equals("accountant"))
            {
                inv.Description = Session["InvoiceID"].ToString();
            }

            _invoiceService.AddInvoice(inv);


            UserInvoice userInv = new UserInvoice();
            int userId = 0;
            if (role.Equals("requestor"))
            {
                userInv.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("pending for approve")).FirstOrDefault().Id;
                var roleID = _roleGroupService.GetAllRoleGroups().Where(p => p.GroupName.ToString().ToLower().Equals("requestor")).FirstOrDefault().Id;
                userId = _userTableService.GetAllUsers().Where(p => p.RoleGroupId == int.Parse(roleID.ToString())).FirstOrDefault().Id;
            
            }
            else if (role.Equals("accountant"))
            {
                userInv.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("pending for signature")).FirstOrDefault().Id;
                userId = _userTableService.GetAllUsers().Where(p => p.WWID == int.Parse(requestorId)).FirstOrDefault().Id;
            
            }

            var invoiceId = _invoiceService.GetAllInvoices().LastOrDefault().Id;

            userInv.UserTableId = userId;
            // userInv.StatusId = statusId;
            userInv.InvoiceId = invoiceId;
            userInv.isDelete = false;
            _userInvoiceService.AddUserInvoice(userInv);



           
           

            double totalPay = 0;
            foreach (var item in listItem)
            {

                InvoiceItem it = new InvoiceItem();     
                it.ItemVendorId = item.ItemVendorId;
                it.InvoiceId = invoiceId;
                it.isDelete = false;                    
                it.Quantity = item.Quantity;
                it.totalPrice = item.totalPrice;
                totalPay += item.totalPrice;
                _invoiceItemService.AddInvoiceItem(it);


            }

            Invoice invo = _invoiceService.GetInvoiceById(invoiceId);
            invo.totalPayment = totalPay;
            _invoiceService.EditInvoice(invo);



            Session["listItem"] = null;
            Session["option"] = null;
            Session["InvoiceID"] = null;


            InvoiceViewModel invoice = new InvoiceViewModel();
            invoice.Id = invoiceId;
            invoice.Description = invo.Description;
            invoice.requestID = invo.requestID;
            invoice.URL = "";
            //return RedirectToAction("Index");
            return View("Upload", invoice);
        }







        //=======================================================================



  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


        public ActionResult Edit(int id)
        {
            if (Session["role"] != null)
            {

                var session = Session["role"].ToString().ToLower();
                var obj = _invoiceService.GetInvoiceById(id);
                var status = obj.UserInvoices.FirstOrDefault().Status.StatusName.ToString().ToLower();

                if (!session.Equals("super user"))
                {
                    if (!session.Equals("requestor") || (session.Equals("requestor") && status.Equals("pending for approval")))
                    {
                        InvoiceViewModel item = Mapper.Map<Invoice, InvoiceViewModel>(obj);
                        item.recentStatus = obj.UserInvoices.LastOrDefault().Status.StatusName;
                        item.UserTableId = obj.UserInvoices.FirstOrDefault().UserTableId;
                        item.PaymentAmount = obj.totalPayment;
                        item.option = obj.optionA.ToString();
                        
                        //item.PaymentCreatedDate = DateTime.Now;

                        var invId = obj.Description;
                        if(invId == null)
                        {
                            item.Description = "";
                        }
                       
                        if(!obj.URL.ToString().Equals(""))
                        {

                            string dir = "~/App_Data/Upload";
                           // dir += "/" + obj.Description.ToString();
                            dir += "/" + obj.requestID.ToString();
                            //           string dir = "~/App_Data/Invoices/" + INVOICEID;
                            string phyDir = Server.MapPath(dir);
                            if (Directory.Exists(phyDir))
                            {
                                string[] filePaths = Directory.GetFiles(phyDir);
                                foreach (string path in filePaths)
                                {

                                    item.fileName = Path.GetFileName(path);

                                }
                            }



                        }

                        return View(item);
                    }
                    else return RedirectToAction("Index");
                }
                else return RedirectToAction("Index");
            }
            else
            {
                return RedirectToAction("Index", "Dashboard");
            }

        }

        [HttpPost]
        public ActionResult Edit(InvoiceViewModel obj)
        {   
            string status="";
            Invoice item = _invoiceService.GetInvoiceById(obj.Id);
            var role = Session["role"].ToString().ToLower();
            var note = item.UserInvoices.LastOrDefault().Status.Note.ToString().ToLower();            
           

            //if (obj.approve == true)
            //{
                status = ChangeStatus.ChangeStatusInvoice(Session["role"].ToString(), obj.recentStatus.Trim(), false, false);
            //}
            //else status = obj.recentStatus;           
            
            //Add 3 text
                if (obj.recentStatus.ToLower().Equals("waiting for payment"))
                {
                    var a = obj.PaymentCreatedDate.ToShortDateString();
                    
                    if (obj.PaymentVoucher == 0 || obj.PaymentCreatedDate.ToShortDateString().Equals("1/1/0001"))
                    {
                        return Redirect("/Invoice/Edit?id=" + obj.Id);
                    }
                    

                var invoice = _invoiceService.GetInvoiceById(obj.Id);
                invoice.PaymentAmount = obj.PaymentAmount;
                invoice.PaymentCreatedDate = obj.PaymentCreatedDate;
                invoice.PaymentVoucher = obj.PaymentVoucher;
                _invoiceService.EditInvoice(invoice);
                }
                else if (obj.recentStatus.ToString().ToLower().Equals("pending for validation") && role.Equals(note) /*&& !obj.InvoiceId.ToString().Equals("")*/)
                {
                    if (obj.InvoiceId == null)
                    {
                        return Redirect("/Invoice/Edit?id=" + obj.Id);
                    }
                    item.Description = obj.InvoiceId.ToString(); // add invoice ID
                    _invoiceService.EditInvoice(item);

                }


            if (status != null)
            {
            var wwid = Session["wwid"].ToString();
            //    var wwid = "11511221";
            UserInvoice userInvoice = new UserInvoice();
            userInvoice.CreatedDate = DateTime.Now.Date;
            userInvoice.InvoiceId = obj.Id;
            userInvoice.isDelete = false;
            
            userInvoice.isReject = false;
            

            userInvoice.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToLower().Trim().Equals(status.ToLower().Trim())).FirstOrDefault().Id;
           
            if (role.Equals("requestor manager"))
            {
                var requestorMngID = _roleGroupService.GetAllRoleGroups().Where(p=>p.GroupName.ToString().ToLower().Equals("requestor manager")).FirstOrDefault().Id;
                userInvoice.UserTableId = _userTableService.GetAllUsers().Where(p => p.RoleGroupId == requestorMngID).FirstOrDefault().Id;
            }
            else
            {
                userInvoice.UserTableId = _userTableService.GetAllUsers().Where(p => p.WWID == int.Parse(wwid)).FirstOrDefault().Id;
            }
                _userInvoiceService.AddUserInvoice(userInvoice);
            }

            
            return RedirectToAction("Index");
        }

      

          public ActionResult RejectReason(InvoiceViewModel obj)
        {


            var wwid = Session["wwid"].ToString(); 
            //var wwid = "11573963";

            UserInvoice uInvoice = new UserInvoice();

            uInvoice.CreatedDate = DateTime.Now.Date;
            uInvoice.InvoiceId = obj.Id;
            uInvoice.isDelete = false;
            uInvoice.isReject = true;
            //uInvoice.rejectReason = obj.UserInvoices.LastOrDefault().rejectReason;
            uInvoice.rejectReason = obj.rejectReason;
            uInvoice.UserTableId = obj.UserTableId;
            uInvoice.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToLower().Trim().Equals(obj.recentStatus.ToLower().Trim())).FirstOrDefault().Id;

    //        var requestor = "<strong>" + _userTableService.GetUserById(obj.UserTableId).UserName.ToString() + "</strong>";
    //        var rejector = "<strong>"+_userTableService.GetAllUsers().Where(p => p.WWID == int.Parse(wwid)).FirstOrDefault().UserName.ToString() + "</strong>";
            //string email = "tu.gia.linh.phan@intel.com";



            Invoice inv = _invoiceService.GetInvoiceById(obj.Id);
            string[] array = inv.Note.ToString().Split('|');

            string RequestorId = array[0];
            string email = array[1];
            string ManagerId = array[2];
           // string rejector = "<strong>" +_userTableService.GetAllUsers().Where(p => p.WWID.ToString().Equals(ManagerId)).FirstOrDefault().UserName.ToString() + "<strong>";
           // string requestor = "<strong>"+_userTableService.GetAllUsers().Where(p => p.WWID.ToString().Equals(RequestorId)).FirstOrDefault().UserName.ToString() + "<strong>";


            LoginClass.Member Requestor = LoginClass.GetName(int.Parse(RequestorId.ToString()));
            LoginClass.Member Manager = LoginClass.GetName(int.Parse(ManagerId.ToString()));
            string requestor = "<strong>" + Requestor.ccMailName + "<strong>";
            string rejector = "<strong>" + Manager.ccMailName + "<strong>";
            string banner = "<img src='http://vimt.intel.com/Images/bannerVIMT.png'><br><br><br><br>";
            string content = banner + "Dear " + requestor + ", <br/> Your invoice " + "(ID: " + obj.requestID + ") was rejected by " + rejector + " <br/> <b>Reason: " + obj.rejectReason + "</b>.<br/>Best Sincerely ";
              
              // string email = "thanh.an.tran@intel.com";
         
           
              Mail.SendMail(content, email);
            _userInvoiceService.AddUserInvoice(uInvoice);

            return RedirectToAction("Index");
        }

          public ActionResult sendCDS(InvoiceViewModel obj)
          {
              if (Session["role"] != null)
              {
                  var role = Session["role"].ToString();
                  if (role.ToLower().Equals("accountant"))
                  {

                      //var wwid = Session["wwid"].ToString();
                      //var wwid = "11573963";

                      var uInvoice = _invoiceService.GetInvoiceById(obj.Id);
                      uInvoice.IsCDS = true;
                      
                      //uInvoice.Description// invoice id do accountant nhâop
                      //uInvoice.isReject = true;
                      //obj.quantity = uInvoice.InvoiceItems.
                      //uInvoice.rejectReason = obj.UserInvoices.LastOrDefault().rejectReason;
                      //uInvoice.rejectReason = obj.rejectReason;
                      //uInvoice.UserTableId = obj.UserTableId;
                      //uInvoice.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToLower().Trim().Equals(obj.recentStatus.ToLower().Trim())).FirstOrDefault().Id;
                      var listItemInvoice = _invoiceItemService.GetAllInvoiceItems().Where(p => p.InvoiceId == obj.Id);
                      String table = "<table  border='1px' width='600' style=' border-collapse: collapse;text-align: center;'>" +
                          "<thead style='background-color: #0062a8;'><tr><th>No</th><th>Name</th><th>Quantity</th>" +
                          "<th>Unit</th><th>Price</th><th>Total Price</th></tr></thead>" +
                          "<tbody>";
                      int count = 0;
                      int quantity = 0;
                      double totalPayment = 0;
                      foreach (var item in listItemInvoice)
                      {
                          count++;
                          quantity += item.Quantity;
                          totalPayment += slitString.sum(item.Quantity, item.ItemVendor.Price);
                          table += "<tr><td>" + count + "</td>"
                                + "<td>" + item.ItemVendor.ItemName.ToString() + "</td>" + "<td>" + item.Quantity.ToString() + "</td>"
                                + "<td>" + item.ItemVendor.Unit.ToString() + "</td>"
                                + "<td>" + item.ItemVendor.Price.ToString(("##,###,##0")) + "</td>"
                                + "<td>" + slitString.sum(item.Quantity, item.ItemVendor.Price).ToString("##,###,##0") + "</td></tr>";
                      }
                      table += "<td></td><td><b>Total Quantity</b></td><td><b>" + quantity.ToString() + "</b></td>";
                      table += "<td></td><td><b>Amount Payable</b></td><td><b>" + uInvoice.totalPayment.ToString("##,###,##0") + "</b></td></tbody></table>";
                      //var requestor = "<strong>" + _userTableService.GetUserById(obj.UserTableId).UserName.ToString() + "</strong>";
                      var sender = "VIMT team";
                      //var rejector = "<strong>" + _userTableService.GetAllUsers().Where(p => p.WWID == int.Parse(wwid)).FirstOrDefault().UserName.ToString() + "</strong>";
                      //string email = "tu.gia.linh.phan@intel.com";
                      
                      string email = "thanh.an.tran@intel.com";

                      // string email = Session["mail"].ToString();
                      string banner = "<img src='http://vimt.intel.com/Images/bannerVIMT.png'><br><br><br><br>";
                      string content = banner + "Dear CDS, <br/><br/> The invoice " + "(<b>ID: " + uInvoice.Description + "</b>) has sent to by "
                          + sender + " <br/> <b>Reason: Report for Customs Clearance" + "</b>.<br/><br/>" +
                          table + "<br/>Thanks and Best Sincerely, <br/><b>VIMT Team</b> ";
                      Mail.SendMail(content, email);
                      _invoiceService.EditInvoice(uInvoice);

                      return RedirectToAction("Index");
                  }
                  else return Redirect("/Dashboard/Index");
              }
              else return Redirect("/Dashboard/Index");
          }
          

        public ActionResult View(int id)
        {
            if (Session["role"] != null)
            {
                var invoice = _invoiceService.GetInvoiceById(id);
                return View(invoice);
            }
            else
            {
                return RedirectToAction("Index", "Dashboard");
            }
        }

        public ActionResult Delete(int id)
        {
            //var session = Session["role"].ToString().ToLower();
            //var obj = _invoiceService.GetInvoiceById(id);
            //var status = obj.UserInvoices.FirstOrDefault().Status.StatusName.ToString().ToLower();
            //if (session.Equals("super user") || (session.Equals("requestor") && status.Equals("pending for approval")))
            //{

            //    _invoiceService.DeleteInvoice(obj);
            //}
            return RedirectToAction("Index");
        }



        public ActionResult Print(int Id)
        {
            var obj = _invoiceService.GetInvoiceById(Id);
            InvoiceViewModel item = Mapper.Map<Invoice, InvoiceViewModel>(obj);
          //  obj.Description = item.InvoiceId.ToString();
           // _invoiceService.EditInvoice(obj);

            return View(item);
        }


        public ActionResult Save(InvoiceViewModel obj)
        {

            Invoice item = _invoiceService.GetInvoiceById(obj.Id);
            var status = obj.recentStatus.ToString().ToLower();
            var role = Session["role"].ToString().ToLower();
            var note = item.UserInvoices.LastOrDefault().Status.Note.ToString().ToLower();

            if (status.Equals("pending for validation") && role.Equals(note))
            {
                item.Description = obj.InvoiceId.ToString();
                _invoiceService.EditInvoice(item);
               
            }


            //else if (status.Equals("waiting for paymnent") && role.Equals(note))
            //{
            //    item.PaymentVoucher = obj.PaymentVoucher;
            //    item.PaymentAmount = obj.PaymentAmount;
            //   // item.PaymentCreatedDate = obj.PaymentCreatedDate;
            //}

            //Redirect("/Invoice/Edit?id="+obj.Id);

            return RedirectToAction("Edit", obj);
        }






        public ActionResult ViewPaymentDashboard()
        {

            if (Session["role"] != null)
            {
                var role = Session["role"].ToString();
                if (role.ToLower().Equals("accountant manager"))
                {    
                    var invoice = _invoiceService.GetAllInvoices().Where(p=>p.Description != null && p.UserInvoices.LastOrDefault().isReject == false).OrderBy(p=>p.PaymentVoucher);
                    // nếu là requestor thì lấy invoice thuộc wwid của nó
                    //var UserInvoices = _userInvoiceService.GetAllUserInvoices().Distinct();
                    //List<Invoice> listInvoice = new List<Invoice>();
                    //foreach (var item in UserInvoices)
                    //{
                    //    Invoice obj = _invoiceService.GetInvoiceById(item.InvoiceId);
                    //    listInvoice.Add(obj);
                    //}
                    return View("ViewPaymentDashboard", invoice);
                }
                else
                {
                    return RedirectToAction("Index", "Dashboard");
                }
            }
            else
            {
                return RedirectToAction("Index", "Dashboard");
            }
        }


        public ActionResult MenuVendor()
        {
            var listVendor = _vendorService.GetAllVendors();

            return PartialView("_MenuVendor",listVendor);
        }


        public ActionResult Scrap(InvoiceViewModel obj)
        {
            if (Session["role"] != null)
            {
                 var role = Session["role"].ToString();
                 if (role.ToLower().Equals("accountant"))
                 {

                     Invoice item = _invoiceService.GetInvoiceById(obj.Id);
                     item.isDelete = true;
                     _invoiceService.EditInvoice(item);

                     var ListUserInv = _userInvoiceService.GetAllUserInvoices().Where(p => p.InvoiceId == obj.Id);
                     foreach (var inv in ListUserInv)
                     {
                         inv.isDelete = true;
                         _userInvoiceService.EditUserInvoice(inv);
                     }

                     //UserInvoice userInv = _userInvoiceService.GetAllUserInvoices().Where(p => p.InvoiceId == obj.Id).LastOrDefault();
                     //userInv.isDelete = true;
                     //userInv.StatusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("cancel invoice")).FirstOrDefault().Id;
                     //_userInvoiceService.AddUserInvoice(userInv);

                     return RedirectToAction("Index");

                 }
                 else
                 {
                     return RedirectToAction("Index", "Dashboard");
                 }


            }
            else
            {
                return RedirectToAction("Index", "Dashboard");

            }


        }

        public ActionResult ViewReport()
        {

            return View();
           
        }

        [HttpPost]
        public ActionResult ShowInvAjax(DateTime start, DateTime end )
        {


            var listInv = _invoiceService.GetAllInvoicesReport().Where(p=>p.Description != null);
            
            List<Invoice> listinvoice = new List<Invoice>();

            foreach(var item in listInv )
            {
                var InvDate = item.UserInvoices.FirstOrDefault().CreatedDate;
                if(InvDate > start && InvDate <= end.AddDays(1))
                {
                    listinvoice.Add(item);
                }

            }


            List<Status> liststatus = _statusService.GetAllStatuses().Where(p => !(p.StatusName.ToString().ToLower().Equals("pending for approve") || p.StatusName.ToString().ToLower().Equals("pending for validation"))).ToList();
      
            // var liststatus = _statusService.GetAllStatuses().Where(p => !(p.StatusName.ToString().ToLower().Equals("pending for approve") || p.StatusName.ToString().ToLower().Equals("pending for validation"))).ToList();
            List<double> listAmountInv = new List<double>();

            foreach (var status in liststatus)
            {
                int count = listinvoice.Where(p => p.UserInvoices.LastOrDefault().StatusId == status.Id && p.isDelete == false && p.UserInvoices.LastOrDefault().isReject == false).Count();
                listAmountInv.Add(double.Parse(count.ToString()));
            }
            var reject = listinvoice.Where(p => p.UserInvoices.LastOrDefault().isReject == true).Count();
            var cancel = listinvoice.Where(p => p.isDelete == true).Count();
            listAmountInv.Add(double.Parse(reject.ToString()));
            listAmountInv.Add(double.Parse(cancel.ToString()));


            InvoiceViewModel invVM = new InvoiceViewModel();
            invVM.listInvoices = listinvoice;            
            invVM.listStatuses = liststatus.ToList();

           // return PartialView("_TableInvoice", listinvoice);
            return PartialView("_test", invVM);

        }


        public ActionResult aaa()
        {
            InvoiceViewModel aa = new InvoiceViewModel();
            return View(aa);
        }

        

        [HttpPost]
        //        [ValidateAntiForgeryToken]
        public ActionResult Upload(InvoiceViewModel model)
        {
            try
            {
                //if (ModelState.IsValid) // Validate model
                //{

                Invoice inv = _invoiceService.GetInvoiceById(model.Id);

                if(model.file == null)
                {
                    model.URL = "";
                    return View("Upload", model);
                }

               
                    HttpPostedFileBase file = model.file; // Get uploaded file
                    string fileName = Path.GetFileName(file.FileName); // Get file name
                    string dir = "~/App_Data/Upload"; // Get root directory
                  //  dir += "/" + model.Description;
                    dir += "/" + model.requestID;


                    


                String phyDir = Server.MapPath(dir);

                    //String phyDir = "\\\\sssweb001\\wwwroot\\VIMT\\App_Data\\Upload\\" + model.requestID;
                   // String phyDir = "C:\\inetpub\\wwwroot\\VIMT\\App_Data\\Upload\\" + model.requestID;

                    // Create new folder if it is not exist
                    if (!Directory.Exists(phyDir))
                        Directory.CreateDirectory(phyDir);
                    //   dir += "/" + INVOICEID; // Get sub directory of distinctive invoices
                    //phyDir = Server.MapPath(dir);
                    // Create new folder if it is not exist
                    //if (!Directory.Exists(phyDir))
                    //Directory.CreateDirectory(phyDir);
                    var path = Path.Combine(Server.MapPath(dir), fileName); // Get fysical path
                   // String path = phyDir+"\\" + fileName;
                file.SaveAs(path); // Save file to server

                string link = "/Invoice/Download?fileName=" + fileName + "&key=" + model.Id;

                inv.URL = link;
                _invoiceService.EditInvoice(inv);

                ViewBag.message = "Upload successfully";

                model.fileName = fileName;
                model.URL = link;

                   
                //}
                //else
                //{
                //    ViewBag.message = "Upload Fail";
                //}
                //return Redirect("Edit?id="+model.Id);
                   
                  //  model.URL = phyDir;
                    return View("Upload", model);
            }
            catch
            {
                ViewBag.Message = "Upload failed";
                return View("Upload", model);
            }
        }



        //public ActionResult ShowFileList()
        //{
        //    List<InvoiceViewModel> files = new List<InvoiceViewModel>();
        //    string dir = "~/App_Data/Upload";
        //    //           string dir = "~/App_Data/Invoices/" + INVOICEID;
        //    string phyDir = Server.MapPath(dir);
        //    if (Directory.Exists(phyDir))
        //    {
        //        string[] filePaths = Directory.GetFiles(phyDir);
        //        foreach (string path in filePaths)
        //        {
        //            InvoiceViewModel file = new InvoiceViewModel();
        //            file.fileName = Path.GetFileName(path);
        //            files.Add(file);
        //        }
        //    }


        //    return View("ShowFileList", files);
        //}

        public FileResult Download(string fileName, int key)
        {

            Invoice inv = _invoiceService.GetInvoiceById(key);

            string dir = "~/App_Data/Upload";
           // dir += "/" + inv.Description;
            dir += "/" + inv.requestID;
            string path = dir + "/" + fileName;
            string phyPath = Server.MapPath(path);
            byte[] file = System.IO.File.ReadAllBytes(phyPath);
            return File(file, MediaTypeNames.Application.Octet);
        }

        public ActionResult DeleteFile(string fileName, int key)
        {

            Invoice inv = _invoiceService.GetInvoiceById(key);
            InvoiceViewModel obj = new InvoiceViewModel();

            obj.Id = key;
            obj.requestID = inv.requestID;
            obj.Description = inv.Description;

            string dir = "~/App_Data/Upload";
            //dir += "/" + inv.Description;
            dir += "/" + inv.requestID;
            string path = dir + "/" + fileName;
            string phyPath = Server.MapPath(path);

            if (System.IO.File.Exists(phyPath))
            {
                System.IO.File.Delete(phyPath);
                ViewBag.message = "Your file has been deleted.";
                inv.URL = "";
                _invoiceService.EditInvoice(inv);

                //return Redirect("Edit?id=" + key);
               // return RedirectToAction("ShowFileList");
                obj.URL = "";
                return View("Upload", obj);
            }
            ViewBag.message = "The file does not exists";
           // return RedirectToAction("ShowFileList");
           // return Redirect("Edit?id=" + key);
            obj.URL = inv.URL;
            return View("Upload", obj);
        }




        





        //public ActionResult InsertItemVendor(string ItemvendorId, int quatity, int InvoiceId)
        //{
        //    InvoiceItem invoiceItem = new InvoiceItem();
        //    var price = _itemVendorService.GetItemVendorById(int.Parse(ItemvendorId)).Price;
        //    invoiceItem.InvoiceId = InvoiceId;
        //    invoiceItem.isDelete = false;
        //    invoiceItem.ItemVendorId = int.Parse(ItemvendorId);
        //    invoiceItem.Quantity = quatity;
        //    invoiceItem.totalPrice = quatity * price;

        //    _invoiceItemService.AddInvoiceItem(invoiceItem);
        //    var invoice = 
        //    return PartialView("_abc",)

        //}

        //public ActionResult CreateVendorInvoice(int vendorId)
        //{
        //    Invoice obj = new Invoice();

        //}
    }
}