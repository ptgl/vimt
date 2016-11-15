using Outsourcing.Data.Models;
using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Labixa.Areas.Admin.Controllers
{
    public class VendorController : BaseController
    {
        #region [Field]
        public readonly IVendorService _vendorService;
        
        #endregion
        #region [ctor]
        public VendorController(IVendorService _vendorService)
        {
            this._vendorService = _vendorService;
        
        }

        #endregion
        //
        // GET: /Admin/Vendor/

        

        public ActionResult Index()
        {
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();
            if (session.Equals("super user") || session.Equals("accountant manager"))
            {
                var list = _vendorService.GetAllVendors().Where(p => !p.isDelete == true);
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
            if (session.Equals("super user") || session.Equals("accountant manager"))
            {
                Vendor obj = new Vendor();
                return View(obj);
            }
            else return Redirect("/Dashboard/Index");
        }

        [HttpPost]
        public ActionResult Create(Vendor vendor)
        {
            _vendorService.Addvendor(vendor);
            return RedirectToAction("Index") ;
        }

        public ActionResult Edit(int id)
        {
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
             var session = Session["role"].ToString().ToLower();
             if (session.Equals("super user") || session.Equals("accountant manager"))
             {
                 var obj = _vendorService.GetVendorById(id);
                 return View(obj);
             }
             else return Redirect("/Dashboard/Index");
        }


        [HttpPost]
        public ActionResult Edit(Vendor obj)
        {
            _vendorService.EditVendor(obj);
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
              if (session.Equals("super user") || session.Equals("accountant manager"))
              {
                  var obj = _vendorService.GetVendorById(id);
                  _vendorService.DeleteVendor(obj);
                  return RedirectToAction("Index");
              }
              else return Redirect("/Dashboard/Index");
        }

	}
}