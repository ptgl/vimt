using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Core.Extensions;
using Labixa.Areas.Admin.ViewModel;
using AutoMapper;
using Outsourcing.Data.Models;


namespace Labixa.Areas.Admin.Controllers
{
    public class ItemVendorController : Controller
    {
         #region [Field]
        public readonly IVendorService _vendorService;
        public readonly IItemVendorService _itemVendorService;
        #endregion
        #region [ctor]
        public ItemVendorController(IVendorService _vendorService,IItemVendorService _itemVendorService)
        {
            this._vendorService = _vendorService;
            this._itemVendorService = _itemVendorService;
        }
        #endregion
        //
        // GET: /Admin/ItemVendor/
        public ActionResult Index()
        {
 
            //var list = _itemVendorService.GetAllItemVendors().Where(p => !p.Note.Equals("1"));
           // System.Web.HttpContext.Current.Session["role"] = "super user";
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }

             var session = Session["role"].ToString().ToLower();
             if (session.Equals("super user") || Session["wwid"].ToString().Equals("11341471"))
             {
            var list = _itemVendorService.GetAllItemVendors().Where(p => !p.isDelete == true);
            return View("Index", list);
            }
            else return Redirect("/Dashboard/Index");
        }

        public ActionResult Create()
        {
            if (Session["role"]==null)
            {
                return Redirect("/Dashboard/Index");
            }
            var session = Session["role"].ToString().ToLower();

            if (session.Equals("super user") || Session["wwid"].ToString().Equals("11341471"))
            {
            var listVendor = _vendorService.GetAllVendors().ToSelectListItems(-1);
            ItemVendorViewModels obj = new ItemVendorViewModels();
            obj.ListVendors = listVendor;
            return View(obj);
            }
            else return Redirect("/Dashboard/Index");
        }

        [HttpPost]
        public ActionResult Create(ItemVendorViewModels obj)
        {
            ItemVendor item = Mapper.Map<ItemVendorViewModels, ItemVendor>(obj);

            string itemName = obj.ItemName.ToString().ToLower();
            int vendorId = obj.VendorId;

            var itemVendor = _itemVendorService.GetAllItemVendors().Where(p => p.ItemName.ToString().ToLower().Equals(itemName) && p.VendorId == vendorId).FirstOrDefault();
            if (itemVendor == null)
            {
                _itemVendorService.AddItemVendor(item);
                return RedirectToAction("Index");
            }
            else return RedirectToAction("Create");
           
        }


        public ActionResult Edit(int id)
        {
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
             var session = Session["role"].ToString().ToLower();
             if (session.Equals("super user") || Session["wwid"].ToString().Equals("11341471"))
             {
            var obj = _itemVendorService.GetItemVendorById(id);
            var listVendor = _vendorService.GetAllVendors().ToSelectListItems(obj.VendorId);
            ItemVendorViewModels item = Mapper.Map<ItemVendor, ItemVendorViewModels>(obj);
            item.ListVendors = listVendor;
            return View(item);
             }
             else return Redirect("/Dashboard/Index");
        }

        [HttpPost]
        public ActionResult Edit(ItemVendorViewModels obj)
        {
            ItemVendor item = Mapper.Map<ItemVendorViewModels, ItemVendor>(obj);
            _itemVendorService.EditItemVendor(item);
            return RedirectToAction("Index") ;
        }


        public ActionResult Delete(int id)
        {
            if (Session["role"] == null)
            {
                return Redirect("/Dashboard/Index");
            }
             var session = Session["role"].ToString().ToLower();
             if (session.Equals("super user") || Session["wwid"].ToString().Equals("11341471"))
             {
            var obj = _itemVendorService.GetItemVendorById(id);
            _itemVendorService.DeleteItemVendor(obj);
            return RedirectToAction("Index");
              }
              else return Redirect("/Dashboard/Index");
        }



	}
}