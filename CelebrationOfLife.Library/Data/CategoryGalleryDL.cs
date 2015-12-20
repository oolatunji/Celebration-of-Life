using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Data
{
    public class CategoryGalleryDL
    {
        public static bool Save(List<CategoryGallery> categoryGallery)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    context.CategoryGalleries.AddRange(categoryGallery);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool CategoryGalleryExists(CategoryGallery categoryGallery)
        {
            try
            {
                var existingCategory = new CategoryGallery();
                using (var context = new ColDBEntities())
                {
                    existingCategory = context.CategoryGalleries
                                    .Where(t => t.CategoryID.Equals(categoryGallery.CategoryID))
                                    .FirstOrDefault();
                }

                if (existingCategory == null)
                    return false;
                else
                    return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<CategoryGallery> RetrieveCategoryGalleries()
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var categories = context.CategoryGalleries.Include("Category").ToList();

                    return categories;
                }
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
                using (var context = new ColDBEntities())
                {
                    //Transaction block
                    using (var transaction = context.Database.BeginTransaction())
                    {
                        try
                        {
                            //Delete existing images
                            var catID = categoryGallery.FirstOrDefault().CategoryID;
                            IEnumerable<CategoryGallery> existingImages = context.CategoryGalleries
                                                            .Where(t => t.CategoryID == catID)
                                                            .ToList();

                            if (existingImages != null && existingImages.ToList().Count != 0)
                            {
                                context.CategoryGalleries.RemoveRange(existingImages);
                                context.SaveChanges();
                            }

                            //Modifying just the property details
                            context.CategoryGalleries.AddRange(categoryGallery);
                            context.SaveChanges();

                            //commit changes
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw ex;
                        }
                    }

                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
