using System.Web;
using System.Web.Optimization;

namespace CelebrationOfLife.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                      "~/Scripts/admin/jquery.min.js",
                      "~/Scripts/admin/sb-admin-2.js",
                      "~/Scripts/admin/bootstrap.min.js",
                      "~/Scripts/admin/metisMenu.min.js",
                      "~/Scripts/admin/raphael-min.js",
                      "~/Scripts/admin/toastr.min.js",
                      "~/Scripts/admin/editor.js",
                      "~/Scripts/datatable/jQuery.DataTables.min.js",
                      "~/Scripts/datatable/dataTables.tableTools.js",
                      "~/Scripts/angular/angular.js",
                      "~/Scripts/common/lodash.js",
                      "~/Scripts/common/factory.js",
                      "~/Scripts/common/toastr.js",
                      "~/Scripts/common/messageBox.js",
                      "~/Scripts/common/global-configuration.js"));

            bundles.Add(new ScriptBundle("~/bundles/client").Include(
                      "~/Scripts/jquery-2.1.1.min.js",
                      "~/Scripts/admin/bootstrap.min.js",
                      "~/Scripts/admin/jquery-ui.min.js",
                      "~/Scripts/jquery.easing.1.3.js",
                      "~/Scripts/turn.js",
                      "~/Scripts/jquery.flexslider.js",
                      "~/Scripts/datatable/jQuery.DataTables.min.js",
                      "~/Scripts/datatable/dataTables.tableTools.js",
                      "~/Scripts/jquery.elastislide.js",
                      "~/Scripts/imagepreloader.js",
                      "~/Scripts/jquery.form.js",
                      "~/Scripts/script.js",
                      "~/Scripts/startup.js",
                      "~/Scripts/common/global-configuration.js",
                      "~/Scripts/common/lodash.js"));

            bundles.Add(new ScriptBundle("~/bundles/signin").Include(
                      "~/Scripts/user/signin.js"));

            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                      "~/Scripts/common/layout.js"));

            bundles.Add(new ScriptBundle("~/bundles/changepassword").Include(
                      "~/Scripts/user/changepassword.js"));

            bundles.Add(new ScriptBundle("~/bundles/adduser").Include(
                      "~/Scripts/user/adduser.js"));

            bundles.Add(new ScriptBundle("~/bundles/viewuser").Include(
                      "~/Scripts/user/viewuser.js"));

            bundles.Add(new ScriptBundle("~/bundles/createcontentcategory").Include(
                      "~/Scripts/webcontentcategory/createcategory.js"));

            bundles.Add(new ScriptBundle("~/bundles/viewcontentcategory").Include(
                      "~/Scripts/webcontentcategory/viewcategory.js"));

            bundles.Add(new ScriptBundle("~/bundles/createcontent").Include(
                      "~/Scripts/webcontent/createcontent.js"));

            bundles.Add(new ScriptBundle("~/bundles/previewcontent").Include(
                      "~/Scripts/webcontent/previewcontent.js"));

            bundles.Add(new ScriptBundle("~/bundles/viewcontent").Include(
                      "~/Scripts/webcontent/viewcontent.js"));

            bundles.Add(new ScriptBundle("~/bundles/updatecontent").Include(
                      "~/Scripts/webcontent/updatecontent.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/admin/bootstrap.min.css",
                     "~/Content/admin/metisMenu.min.css",
                     "~/Content/admin/font-awesome.min.css",
                     "~/Content/admin/timeline.css",
                     "~/Content/admin/toastr.css",
                     "~/Content/admin/editor.css",
                     "~/Content/admin/sb-admin-2.css",
                     "~/Content/admin/jquery.dataTables.min.css",
                     "~/Content/admin/dataTables.tableTools.css"));

            bundles.Add(new StyleBundle("~/Content/client").Include(
                    "~/Content/admin/bootstrap.min.css",
                    "~/Content/reset.css",
                    "~/Content/flexslider.css",
                    "~/Content/style.css",
                    "~/Content/elastislide.css",
                    "~/Content/admin/font-awesome.min.css",
                     "~/Content/admin/jquery.dataTables.min.css",
                     "~/Content/admin/dataTables.bootstrap.min.css",
                     "~/Content/admin/dataTables.tableTools.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
