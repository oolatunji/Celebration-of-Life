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
                      "~/Scripts/datatable/jQuery.DataTables.min.js",
                      "~/Scripts/datatable/dataTables.tableTools.js",
                      "~/Scripts/angular/angular.js",
                      "~/Scripts/common/lodash.js",
                      "~/Scripts/common/factory.js",
                      "~/Scripts/common/toastr.js",
                      "~/Scripts/common/messageBox.js",
                      "~/Scripts/common/global-configuration.js"));

            bundles.Add(new ScriptBundle("~/bundles/adduser").Include(
                      "~/Scripts/user/adduser.js"));

            bundles.Add(new ScriptBundle("~/bundles/viewuser").Include(
                      "~/Scripts/user/viewuser.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/admin/bootstrap.min.css",
                     "~/Content/admin/metisMenu.min.css",
                     "~/Content/admin/font-awesome.min.css",
                     "~/Content/admin/timeline.css",
                     "~/Content/admin/toastr.css",
                     "~/Content/admin/sb-admin-2.css",
                     "~/Content/admin/jquery.dataTables.min.css",
                     "~/Content/admin/dataTables.bootstrap.min.css",
                     "~/Content/admin/dataTables.tableTools.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
