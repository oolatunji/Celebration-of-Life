using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CelebrationOfLife.Web.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            ViewBag.Title = "SignIn";
            return View();
        }

        public ActionResult Dashboard()
        {
            ViewBag.Title = "Dashboard";
            return View();
        }

        public ActionResult CreateUser()
        {
            ViewBag.Title = "Create User";
            return View();
        }

        public ActionResult ViewUser()
        {
            ViewBag.Title = "View User";
            return View();
        }

        public ActionResult ChangePassword()
        {
            ViewBag.Title = "Change Password";
            return View();
        }

        public ActionResult CreateContentCategory()
        {
            ViewBag.Title = "Create Web Content Category";
            return View();
        }

        public ActionResult ViewContentCategory()
        {
            ViewBag.Title = "View Web Content Category";
            return View();
        }

        public ActionResult CreateWebContent()
        {
            ViewBag.Title = "Create Web Content";
            return View();
        }

        public ActionResult PreviewWebContent()
        {
            ViewBag.Title = "Preview Web Content";
            return View();
        }

        public ActionResult UpdateWebContent()
        {
            ViewBag.Title = "Update Web Content";
            return View();
        }

        public ActionResult ViewWebContent()
        {
            ViewBag.Title = "View Web Content";
            return View();
        }
    }
}