using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Data.Models;
using Labixa.Areas.Admin.ViewModel;
using AutoMapper;

namespace Labixa.Areas.Admin.Controllers
{
    public class DelegationController : Controller
    {   

        #region [Field]
        public readonly IUserTableService _userTableService;
        public readonly IRoleGroupService _roleGroupService;
        public readonly IInvoiceService _invoiceService;
        public readonly IUserInvoiceService _userInvoiceService;
        public readonly IStatusService _statusService;



        #endregion
        #region [Ctor]
        public DelegationController( IStatusService _statusService,IUserInvoiceService _userInvoiceService, IInvoiceService _invoiceService, IUserTableService _userTableService, IRoleGroupService _roleGroupService)
        {
            this._userTableService = _userTableService;
            this._roleGroupService = _roleGroupService;
            this._invoiceService = _invoiceService;
            this._userInvoiceService = _userInvoiceService;
            this._statusService = _statusService;
        
        }
      
        #endregion

        //
        // GET: /Admin/Delegation/
        public ActionResult Index()
        {
            if (Session["role"] != null)
            {
                var session = Session["role"].ToString().ToLower();
                if (session.Equals("accountant manager"))
                {
                    int roleId = _roleGroupService.GetAllRoleGroups().Where(p => p.GroupName.ToLower().Equals("accountant manager") && p.isDelete == false).FirstOrDefault().Id;
                    var listUser = _userTableService.GetAllUsers().Where(p => p.RoleGroupId == roleId && p.isDelete == false);
                    return View(listUser);
                }
                else return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                return RedirectToAction("Index", "Dashboard");
            }
        }

        public ActionResult Create()
        {
            if (Session["role"] != null)
            {
                var session = Session["role"].ToString().ToLower();
                if (session.Equals("accountant manager"))
                {
                    UserTable obj = new UserTable();
                    return View(obj);
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



        [HttpPost]
        public ActionResult Create(UserTable obj)
        {
            int roleId = _roleGroupService.GetAllRoleGroups().Where(p => p.GroupName.ToLower().Equals("accountant manager") && p.isDelete == false).FirstOrDefault().Id;
            var actManager = _userTableService.GetAllUsers().Where(p => p.WWID == obj.WWID && p.RoleGroupId == roleId && p.isDelete == false).FirstOrDefault();

            if (actManager != null) // check duplicate act manager
            {
                return RedirectToAction("Create");
            }else
            {

                var user = _userTableService.GetAllUsers().Where(p => p.WWID == obj.WWID && p.isDelete == false).FirstOrDefault();

                if (user != null)
                {
                    obj.UserName = user.UserName;
                    obj.RoleGroupId = roleId;
                    obj.isDelete = false;
                    _userTableService.Adduser(obj);
                }

                return RedirectToAction("Index");
            }
           
        }

        public ActionResult Delete(int id)
        {
             if (Session["role"] != null)
            {
                 var session = Session["role"].ToString().ToLower();
                 if (session.Equals("accountant manager"))
                 {
                     var obj = _userTableService.GetUserById(id);
                     obj.isDelete = true;
                     _userTableService.EditUser(obj);
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





        public ActionResult DelegateRequestor()
        {
             if (Session["role"] != null)
            {
                 var session = Session["role"].ToString().ToLower();
                 if (session.Equals("requestor"))
                 {

                     int statusId = _statusService.GetAllStatuses().Where(p => p.StatusName.ToString().ToLower().Equals("pending for approve")).FirstOrDefault().Id;
                     //  var UserInvoices = _userInvoiceService.GetAllUserInvoices().Where(p => p.StatusId == statusId && p.isDelete == false && p.UserTable.WWID == 11573963).Distinct();

                     List<int> invId = new List<int>();

                     var wwid = Session["wwid"].ToString();

                     var listInv = _invoiceService.GetAllInvoices().Where(p => p.Note.Split('|').FirstOrDefault().ToString().Equals(wwid));

                     foreach (var obj in listInv)
                     {
                         invId.Add(obj.Id);
                     }

                     List<Invoice> listInvoice = new List<Invoice>();
                     foreach (int item in invId)
                     {

                         UserInvoice uInv = _userInvoiceService.GetAllUserInvoices().Where(p => p.InvoiceId == item && p.isDelete == false).LastOrDefault();

                         if (uInv != null && uInv.StatusId == statusId && uInv.isReject == false)
                         {
                             Invoice obj = _invoiceService.GetInvoiceById(uInv.InvoiceId);
                             listInvoice.Add(obj);

                         }
                     }

                     return View(listInvoice);

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


        public ActionResult Edit(int id) //edit manager requestor
        {
            if (Session["role"] != null)
            {
                var session = Session["role"].ToString().ToLower();
                if (session.Equals("requestor"))
                {
                    Invoice inv = _invoiceService.GetInvoiceById(id);
                    InvoiceViewModel item = Mapper.Map<Invoice, InvoiceViewModel>(inv);
                    item.recentStatus = inv.UserInvoices.LastOrDefault().Status.StatusName;
                    item.UserTableId = inv.UserInvoices.FirstOrDefault().UserTableId;
                    item.wwidManager = inv.Note.Split('|').LastOrDefault().ToString();

                    return View(item);
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



        [HttpPost]
        public ActionResult Edit(InvoiceViewModel obj)
        {

            if (obj.wwidManager == null)
            {
                return Redirect("Edit?id=" + obj.Id);
            }

            Invoice inv = _invoiceService.GetInvoiceById(obj.Id);
            string wwidManager = obj.wwidManager.ToString();    

            string[] array = inv.Note.Split('|');
            if (!wwidManager.Equals(array[0]) )
            {

               
             //===================================================
                //var user = _userTableService.GetAllUsers().Where(p => p.WWID.ToString().Equals(wwidManager)).FirstOrDefault();
                //if(user!=null)
                //{                    
                //    int roleID = _roleGroupService.GetAllRoleGroups().Where(p => p.GroupName.ToString().ToLower().Equals("requestor manager")).FirstOrDefault().Id;
                //    if(user.RoleGroupId != roleID)
                //    {
                //        user.RoleGroupId = roleID;
                //        _userTableService.Adduser(user);
                //    }
                    
                //}
                //else
                //{                   
                //    return Redirect("Edit?id=" + obj.Id);
                //}

            //==================================================


                inv.Note = array[0] + "|" + array[1] + "|" + obj.wwidManager.ToString();
                _invoiceService.EditInvoice(inv);

                return RedirectToAction("DelegateRequestor");
            }
            else return Redirect("Edit?id="+obj.Id);
          
        }




	}
}