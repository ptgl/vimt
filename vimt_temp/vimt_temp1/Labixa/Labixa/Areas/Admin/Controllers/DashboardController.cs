using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Data;
using Outsourcing.Service;
using Labixa.Areas.Admin.ViewModel;
using Outsourcing.Core.Extensions;
using System.Globalization;
using Labixa.Models;
using System.Net;
using System.Security.Principal;
using Outsourcing.Data.Models;
namespace Labixa.Areas.Admin.Controllers
{
    //[Authorize]
    public class DashboardController : BaseController
    {
        #region [Field]
        public readonly IRoleGroupService _roleGroupService;
        public readonly IUserTableService _userTableService;
        public readonly IInvoiceService _invoiceService;
        #endregion
        #region [ctor]
        public DashboardController(IRoleGroupService _roleGroupService, IUserTableService _userTableService, IInvoiceService _invoiceService)
        {
            this._roleGroupService = _roleGroupService;
            this._userTableService = _userTableService;
            this._invoiceService = _invoiceService;
        }
        #endregion
        // GET: /Dashboard/
        public ActionResult Index()
        {
          
                var list = _roleGroupService.GetAllRoleGroups().ToSelectListItems(-1);
                LoginFormModel obj = new LoginFormModel();
                obj.ListRoleGroup = list;

                //string ip = Request.UserHostName;
                //var uname = ;
                var name = "";
                var name2 ="";
                var name3 = "";
                var name4 = "";
            //try
            //    {
               //==> name = System.Web.HttpContext.Current.Request.LogonUserIdentity.Name.Split(new string[] { "\\" }, StringSplitOptions.None).LastOrDefault().ToString();

            //    }
            //    catch (Exception)
            //    {
                    
            //        throw;
            //    }
                //string name = Request.PhysicalApplicationPath;
            //var item = Request.ServerVariables("remote_addr"));
              //==>  LoginClass.Member member = LoginClass.GetMember(name);
                //try
                //{
                //name2 = System.Web.HttpContext.Current.User.Identity.Name;

                //}
                //catch (Exception)
                //{
                    
                //    throw;
                //}
                //try
                //{
                //name3 = System.Web.HttpContext.Current.Server.MachineName;

                //}
                //catch (Exception)
                //{
                    
                //    throw;
                //}
                //try
                //{
                //name4 = System.Web.HttpContext.Current.Request.LogonUserIdentity.UserClaims.FirstOrDefault().Value;

                //}
                //catch (Exception)
                //{
                    
                //    throw;
                //}
                //Session["user"] = member.ccMailName;

             
                //String ecn = System.Environment.MachineName;
              //  Session["user"] = "name2 = " +name;
                Session["user"] = "" + name;
                //    + "name = " + computer_name4.FirstOrDefault() + "name = " + computer_name5.FirstOrDefault();
                //obj.name = member.ccMailName;
                //obj.WWID = member.WWID;
                //obj.mail = member.DomainAddress;
                //obj.ManagerWWID = member.ManagerWWID;
                //Session["shortId"] = member.shortId;
                //return View(obj);
                obj.name = "gia linh";
                obj.WWID = "11576490";
                obj.mail = "gialinh@gmail.com";
                obj.ManagerWWID = "1234567";
                Session["shortId"] = "tugialin";

               



                return View(obj);

           
        }
        [HttpPost]
        public ActionResult Login(LoginFormModel item)
        {
            //Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
            //Session["wwid"] = item.WWID;
            //Session["mail"] = item.mail;
            //Session["ManagerWWID"] = item.ManagerWWID;



            var role = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
            var wwid = item.WWID;
            if (!role.ToString().ToLower().Equals("requestor"))
            {

                if (role.ToString().ToLower().Equals("requestor manager"))
                {
                    var listInv = _invoiceService.GetAllInvoices();
                    foreach (var obj in listInv)
                    {
                        var manager = obj.Note.ToString().Split('|').LastOrDefault();
                        if (item.WWID.ToString().Equals(manager))
                        {
                            Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
                            Session["wwid"] = item.WWID;
                            Session["mail"] = item.mail;
                            Session["ManagerWWID"] = item.ManagerWWID;
                            return RedirectToAction("Index");
                        }
                    }
                    return RedirectToAction("Index");
                }




                var roleOfUser = _userTableService.GetAllUsers().Where(p => p.WWID.ToString().Equals(wwid.ToString())).FirstOrDefault();
                if (roleOfUser != null)
                {
                    var roleName = _roleGroupService.GetAllRoleGroups().Where(p => p.Id == roleOfUser.RoleGroupId).FirstOrDefault().GroupName;
                    if (role.ToString().Equals(roleName.ToString()))
                    {// right role
                        Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
                        Session["wwid"] = item.WWID;
                        Session["mail"] = item.mail;
                        Session["ManagerWWID"] = item.ManagerWWID;
                        return RedirectToAction("Index");
                    }
                    else
                    {// wrong role

                        return RedirectToAction("Index");
                    }

                }
                else
                {// the user is requestor, return login page with alert
                    return RedirectToAction("Index");
                }
            }



            Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
            Session["wwid"] = item.WWID;
            Session["mail"] = item.mail;
            Session["ManagerWWID"] = item.ManagerWWID;
            Session["listItem"] = null;
            Session["option"] = null;
            return RedirectToAction("Index");

           
        }


         [HttpPost]
        public ActionResult LoginEAM(LoginFormModel item)
        {
            var role = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
            var wwid = item.WWID;
             string shortId = Session["shortId"].ToString();


            if (!role.ToString().ToLower().Equals("requestor"))
            {
                if (role.ToString().ToLower().Equals("requestor manager"))
                {
                    var listInv = _invoiceService.GetAllInvoices();
                    foreach (var obj in listInv)
                    {
                        var manager = obj.Note.ToString().Split('|').LastOrDefault();
                        if (item.WWID.ToString().Equals(manager))
                        {
                            Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
                            Session["wwid"] = item.WWID;
                            Session["mail"] = item.mail;
                            Session["ManagerWWID"] = item.ManagerWWID;
                            return RedirectToAction("Index");
                        }
                    }
                    return RedirectToAction("Index");
                }
                else
                {
                    string roleGroup = role.ToString().ToLower();
                    string groupAdimName = "";

                    switch (roleGroup)
                    {
                        case "accountant":
                            groupAdimName = "accountant";
                            break;
                        case "accountant manager":
                            groupAdimName = "accountant manager";
                            break;
                        case "CSM":
                            groupAdimName = "CSM";
                            break;
                        case "MSSC":
                            groupAdimName = "MSSC";
                            break;
                        default:
                           
                            break;
                    }

                    if (LoginClass.IsMemberOfGroup(groupAdimName, shortId))
                    {
                        if (groupAdimName.Equals("accountant") || groupAdimName.Equals("accountant manage"))
                        {
                            var user = _userTableService.GetAllUsers().Where(p => p.WWID.ToString().Equals(wwid.ToString())).FirstOrDefault();
                            if (user == null)
                            {
                                UserTable obj = new UserTable();
                                obj.WWID = int.Parse(wwid.ToString());
                                obj.UserName = item.name;
                                obj.RoleGroupId = item.RoleGroupId;
                                _userTableService.Adduser(obj);
                            }
                        }

                        
                         Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
                         Session["wwid"] = item.WWID;
                         Session["mail"] = item.mail;
                         Session["ManagerWWID"] = item.ManagerWWID;
                         return RedirectToAction("Index");
                    }
                    else
                    {
                        return RedirectToAction("Index");
                    }
                    

                }
            


            }

            Session["role"] = _roleGroupService.GetRoleGroupById(item.RoleGroupId).GroupName;
            Session["wwid"] = item.WWID;
            Session["mail"] = item.mail;
            Session["ManagerWWID"] = item.ManagerWWID;
            Session["listItem"] = null;
            Session["option"] = null;

            return View();
         }






        public ActionResult Logoff()
        {
            Session["role"] = null;
            Session["wwid"] = null;
            Session["mail"] = null;
            Session["ManagerWWID"] = null; 
            return RedirectToAction("Index");
        }
    }
}