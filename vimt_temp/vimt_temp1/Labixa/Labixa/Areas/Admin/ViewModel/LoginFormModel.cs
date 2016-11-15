using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Labixa.Areas.Admin.ViewModel
{
    public class LoginFormModel
    {
        public LoginFormModel()
        {
            ListRoleGroup = new List<SelectListItem>();
            RoleGroupId = 1;
            name = "requestor";
        }
        public int RoleGroupId { get; set; }
        public string name { get; set; }
        public string WWID { get; set; }
        public string mail { get; set; }
        public string ManagerWWID { get; set; }
        public IEnumerable<SelectListItem> ListRoleGroup { get; set; }

    }
}