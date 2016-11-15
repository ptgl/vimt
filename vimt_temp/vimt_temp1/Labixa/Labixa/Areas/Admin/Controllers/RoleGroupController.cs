using Outsourcing.Data.Models;
using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Labixa.Areas.Admin.Controllers
{
    public class RoleGroupController : Controller
    {
        #region [Field]
        public readonly IRoleGroupService _roleGroupService;
        #endregion
        #region [ctor]
        public RoleGroupController(IRoleGroupService _roleGroupService)
        {
            this._roleGroupService = _roleGroupService;
        }
        #endregion
        //
        // GET: /Admin/RoleGroup/
        public ActionResult Index()
        {
            //var list = _roleGroupService.GetAllRoleGroups().Where(p => !p.Note.Equals("1"));
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
            var list = _roleGroupService.GetAllRoleGroups().Where(p => !p.isDelete == true);
            return View("Index", list);
            }
            else return Redirect("/Dashboard/Index");
        }

        //public ActionResult Login()
        //{ return View(); }

        public ActionResult Create()
        {
            //return View();
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
                return View();
            }
            else return Redirect("/Dashboard/Index");
        }

        [HttpPost]
        public ActionResult Create(RoleGroup obj)
        {
            _roleGroupService.AddRoleGroup(obj);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int id)
        {
            //var obj = _roleGroupService.GetRoleGroupById(id);
            //return View(obj);
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
                var obj = _roleGroupService.GetRoleGroupById(id);
                return View(obj);
            }
            else return Redirect("/Dashboard/Index");
        }


        [HttpPost]
        public ActionResult Edit(RoleGroup obj)
        {
            _roleGroupService.EditRoleGroup(obj);
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            //var obj = _vendorService.GetVendorById(id);
            //obj.Note = "1";//1 delete; 0 available

            //_vendorService.EditVendor(obj);

            
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
                var obj = _roleGroupService.GetRoleGroupById(id);
                _roleGroupService.DeleteRoleGroup(obj);

                return RedirectToAction("Index");
            }
            else return Redirect("/Dashboard/Index");
        }




	}
}