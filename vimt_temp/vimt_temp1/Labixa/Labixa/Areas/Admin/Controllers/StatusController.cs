using Outsourcing.Data.Models;
using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Labixa.Areas.Admin.Controllers
{
    public class StatusController : Controller
    {
        #region [Field]
        public readonly IStatusService _statusService;
        #endregion
        #region [ctor]
        public StatusController(IStatusService _statusService)
        {
            this._statusService = _statusService;
        }
        #endregion
        //
        // GET: /Admin/Status/
        public ActionResult Index()
        {
            
            //var list = _statusService.GetAllStatuses().Where(p => !p.Note.Equals("1"));
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
                var list = _statusService.GetAllStatuses().Where(p => !p.isDelete == true);
                return View("Index", list);
            }
            else return Redirect("/Dashboard/Index");
        }

        public ActionResult Create()
        {
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
        public ActionResult Create(Status obj)
        {
            _statusService.AddStatus(obj);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int id)
        {
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user"))
            {
                var obj = _statusService.GetStatusById(id);
                return View(obj);
            }
            else return Redirect("/Dashboard/Index");
            
        }


        [HttpPost]
        public ActionResult Edit(Status obj)
        {
            _statusService.EditStatus(obj);
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
                var obj = _statusService.GetStatusById(id);
                _statusService.DeleteStatus(obj);

                return RedirectToAction("Index");
            }
            else return Redirect("/Dashboard/Index");
            
        }
	}
}