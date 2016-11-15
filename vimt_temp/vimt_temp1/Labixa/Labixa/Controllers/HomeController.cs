using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Labixa.Models;
using Outsourcing.Service;
using Outsourcing.Data.Models;
using PagedList;
using Labixa.ViewModels;
namespace Labixa.Controllers
{

    public class HomeController : BaseHomeController
    {
        //private readonly IProductService _productService;
        //private readonly IBlogService _blogService;
        //private readonly IBlogCategoryService _blogCategoryService;
        //private readonly IWebsiteAttributeService _websiteAttributeService;
        //private readonly IStaffService _staffService;
        //private readonly IProductAttributeMappingService _productAttributeMappingService;
        //private readonly IProductRelationshipService _productRelationshipService;



        //public HomeController(IProductService productService, IBlogService blogService,
        //    IWebsiteAttributeService websiteAttributeService, IBlogCategoryService blogCategoryService,
        //    IStaffService staffService, IProductAttributeMappingService productAttributeMappingService, 
        //    IProductRelationshipService productRelationshipService )
        //{
        //    this._productService = productService;
        //    this._blogService = blogService;
        //    this._websiteAttributeService = websiteAttributeService;
        //    this._blogCategoryService = blogCategoryService;
        //    this._staffService = staffService;
        //    this._productAttributeMappingService = productAttributeMappingService;
        //    this._productRelationshipService = productRelationshipService;

        //}
        public ActionResult Index()
        {

           
            //var model = new HomeViewModel();
            //model.HomePageBlogs = _blogService.GetHomePageBlogs().ToList();
            //model.HomePageProducts = _productService.GetDailyTour().Take(6).ToList();
            //model.LongTourProducts = _productService.GetLongTour().Take(3).ToList();
            //model.HomePageNews = _blogService.Get3BlogNewsNewest().ToList();
            //model.HomePageService = _blogService.Get6BlogService().ToList();
            //model.ListWebsiteAttribute = _websiteAttributeService.GetWebsiteAttributes().Where(p=>p.Type.Equals("ThongTinBe")).ToList();
            //var popup = _websiteAttributeService.GetWebsiteAttributeByName("Labixa.PopupWebsite");
            //if (popup.IsPublic)
            //{
            //    model.Popup = popup.Value;

            //}
            //var listVideos = _websiteAttributeService.GetWebsiteAttributes().Where(w => w.Type == "Video" && w.IsPublic);
            //List<string> Videos = new List<string>();
            //foreach (var video in listVideos)
            //{
            //    if (!video.Description.Equals("Video HomePage"))
            //    {
            //    Videos.Add(video.Value);
            //    }
            //    else
            //    {
            //        model.HomeVideo = video.Value;
            //    }
               
            //}
            //model.ListVideo = Videos;
            //return RedirectToAction("Index","Dashboard");
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            //var item = _blogService.GetBlogContact();
            return View();
        }

        //public ActionResult TourOcean()
        //{
        //    return View();
        //}

        //public ActionResult Toolbar()
        //{
        //    //var model = _staffService.GetStaffs().GroupBy(s=> s.Type).ToList();
        //    return PartialView("_Toolbar", model);
        //}
        
        ///// <summary>
        ///// Get Blog 
        ///// </summary>
        ///// <param name="slug"></param>
        ///// <returns></returns>
        //public ActionResult HomePageNews(string slug, int? page)
        //{

        //    var blogcategory = _blogCategoryService.GetBlogCategoryByUrl(slug.ToLower());
        //    var model = _blogService.GetBlogByCategoryId(blogcategory.Id);
        //    var ProjectList = model;
        //    int pageSize = 12;
        //    ViewBag.slug = slug;
        //    int pageNumber = (page ?? 1);
        //    //Check layout and return View
        //    if (blogcategory.Layout == 1)
        //    {
        //        //return View("HomePageServices", ProjectList);
        //        return View("HomePageServices",ProjectList.OrderBy(s => s.Position).ToPagedList(pageNumber, pageSize));
        //    }
        //    //HomePageNews,HomePagePromotion
        //    //return View(ProjectList);
        //    return View(ProjectList.OrderBy(s => s.Position).ToPagedList(pageNumber, pageSize));
        //}

        //public ActionResult HomePageTour(int? page)
        //{

        //    var model = _productService.GetHomePageProducts(false);
        //    var ProjectList = model;
        //    int pageSize = 12;
        // //   ViewBag.slug = slug;
        //    int pageNumber = (page ?? 1);
        //  //  return View(model);
        //    TourModels item = new TourModels();
        //    item.ListProduct = ProjectList.OrderBy(s => s.Position).ToPagedList(pageNumber, pageSize);
        //    return View(item);
        //}

        ////public ActionResult HomePageServices()
        ////{
        ////    return View();
        ////}
        //public ActionResult Belabixa()
        //{
        //    return View();
        //}
        //public ActionResult BaoChiBeLabixa()
        //{
        //    var model = _blogService.Get3BlogNewsNewest(); 
        //    return PartialView("_BaoChiBeLabixa", model); 
        //}
        //public ActionResult DetailTour(string slug)
        //{
        //    var tour =_productService.GetProductBySlug(slug);
        //    var listrelation = _productRelationshipService.GetProductById(tour.Id);
        //    List<Product> relation = new List<Product>();
        //    foreach (var item in listrelation)
        //    {
        //        Product obj = new Product();
        //        obj = _productService.GetProductById(int.Parse(item.ProductRelateId.ToString()));
        //        relation.Add(obj);
        //    }
        //    ViewBag.TourRelation = relation;
        //    OrderTour model = new OrderTour();
        //    model.product = tour;
        //    return View(model);
        //}
        //public ActionResult DetailNews(string slug)
        //{
        //    var blog = _blogService.GetBlogByUrlName(slug);
        //    return View(blog);
        //}

        //public ActionResult NewPost()
        //{
        //    var list = _blogService.GetNewPost();
        //    return PartialView("_NewPost",list);
        //}
        //public ActionResult GetSideBarBanner()
        //{
        //    var listbanner = _websiteAttributeService.GetWebsiteAttributes().Where(w => w.Type == "Banner" && w.IsPublic);
        //    var content = "";
        //    foreach (var websiteAttribute in listbanner)
        //    {
        //        content += websiteAttribute.Value;
        //    }
        //    return Content(content);
        //}

        //public ActionResult GetLinkVideo()
        //{
        //    var listbanner = _websiteAttributeService.GetWebsiteAttributes().Where(w => w.Type == "Video" && w.IsPublic).FirstOrDefault();
        //    var content = listbanner.Value;
        //    return Content(content.Trim());
        //}


        //      public ActionResult DoiTac()
        //{
                  
        //    var listbanner = _websiteAttributeService.GetWebsiteAttributes().Where(w => w.Type == "DoiTac" && w.IsPublic);
        //    return PartialView("_Partner",listbanner);
        //      }
    }
}