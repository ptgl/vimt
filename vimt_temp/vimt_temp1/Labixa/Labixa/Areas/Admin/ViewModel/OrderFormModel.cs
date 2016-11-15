//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Web;
//using FluentValidation.Mvc;
//using FluentValidation.Validators;
//using FluentValidation;
//using Outsourcing.Data.Models;
//using System.Web.Mvc;

//namespace Labixa.Areas.Admin.ViewModel
//{

//    [FluentValidation.Attributes.Validator(typeof(OrderValidator))]
//    public class OrderFormModel
//    {
//        public OrderFormModel()
//        {
//            CustomerEmail = "default";
//            Note = "Default";
//            Deleted = true;
//            listItem = new List<SelectListItem>();
//            listOrderItem = new List<OrderItem>();
//        }
//        [Key]
//        public int Id { get; set; }

//        [DisplayName(@"Vendor")]
//        public string CustomerName { get; set; }

//        [DisplayName(@"Address")]
//        public string CustomerAddress { get; set; }

//        [DisplayName(@"Tax Code")]
//        public string CustomerPhone { get; set; }

//        [DisplayName(@"Email")]
//        public string CustomerEmail { get; set; }

//        [DisplayName(@"Total Order")]
//        public int OrderTotal { get; set; }

//        [DisplayName(@"Tình trạng")]
//        public bool Deleted { get; set; }

//        [DisplayName(@"Ghi chú")]
//        public string Note { get; set; }

//        [DisplayName(@"Sản Phẩm")]
//        public IEnumerable<SelectListItem> listItem { get; set; }
//        [DisplayName(@"Item")]
//        public int productId { get; set; }
//        [DisplayName(@"Quantity")]
//        public int Quantity { get; set; }

//        public List<OrderItem> listOrderItem { get; set; }
//    }
//    public class OrderValidator : AbstractValidator<OrderFormModel>
//    {
//        public OrderValidator()
//        {
//            RuleFor(x => x.CustomerName).NotNull().WithMessage("Tên Khách Hàng Không Được Để Trống");
//            RuleFor(x => x.CustomerAddress).NotNull().WithMessage("Địa Chỉ Không Được Để Trống");
//            RuleFor(x => x.CustomerPhone).NotNull().WithMessage("Điện Thoại Không Được Để Trống");
//            RuleFor(x => x.CustomerPhone).Length(10,12) .WithMessage("Số Điện Thoại Không Hợp Lệ (10 - 12 số)");
//            RuleFor(x => x.CustomerEmail).NotNull().WithMessage("Email Không Được Để Trống");
//        }
//    }
//}