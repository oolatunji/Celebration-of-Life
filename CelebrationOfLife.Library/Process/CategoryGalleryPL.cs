using CelebrationOfLife.Library.Data;
using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Process
{
    public class CategoryGalleryPL
    {
        public static bool Save(List<CategoryGallery> categoryGallery, out string message)
        {
            try
            {
                if (CategoryGalleryDL.CategoryGalleryExists(categoryGallery.FirstOrDefault()))
                {
                    message = string.Format("Content exists already for the selected category");
                    return false;
                }
                else
                {
                    message = string.Empty;
                    if (CategoryGalleryDL.Save(categoryGallery))
                    {
                        return true;
                    }
                    else
                        return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<CategoryGallery> RetrieveCategoryImages()
        {
            try
            {
                return CategoryGalleryDL.RetrieveCategoryGalleries();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(List<CategoryGallery> categoryGallery)
        {
            try
            {
                return CategoryGalleryDL.Update(categoryGallery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
