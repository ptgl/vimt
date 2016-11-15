using Microsoft.AspNet.Identity;
using Outsourcing.Data.Models;
using Outsourcing.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Outsourcing.Core.Extensions;
using Labixa.Areas.Admin.ViewModel;
using Labixa.Models;
namespace Labixa.Areas.Admin.Controllers
{
    //[Authorize]
    public  class AdminController : Controller
    {
       
         #region [Field]
        public readonly IRoleGroupService _roleGroupService;
        #endregion
        #region [ctor]
        public AdminController(IRoleGroupService _roleGroupService)
        {
            this._roleGroupService = _roleGroupService;
        }
        #endregion
      
        //
        // GET: /Admin/
        public ActionResult Index()
        {
            var list = _roleGroupService.GetAllRoleGroups().ToSelectListItems(-1);
            LoginFormModel obj = new LoginFormModel();
            obj.ListRoleGroup = list;
            string ip = Request.UserHostName;
            LoginClass.Member member = LoginClass.GetMember(ip);
            obj.name = member.shortId;
            return View(obj);
        }

      
	}
}