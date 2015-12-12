using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Data
{
    public class CategoryDL
    {
        public static bool Save(Category category)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    context.Categories.Add(category);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool CategoryExists(Category category)
        {
            try
            {
                var existingCategory = new Category();
                using (var context = new ColDBEntities())
                {
                    existingCategory = context.Categories
                                    .Where(t => t.Name.Equals(category.Name))
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

        public static List<Category> RetrieveCategories()
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var categories = context.Categories.ToList();

                    return categories;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static Category RetrieveCategoryByID(long? userID)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var categories = context.Categories
                                            .Where(f => f.ID == userID);

                    return categories.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(Category category)
        {
            try
            {
                Category existingCategory = new Category();
                using (var context = new ColDBEntities())
                {
                    existingCategory = context.Categories
                                    .Where(t => t.ID == category.ID)
                                    .FirstOrDefault();
                }

                if (existingCategory != null)
                {
                    existingCategory.Name = category.Name;

                    using (var context = new ColDBEntities())
                    {
                        context.Entry(existingCategory).State = EntityState.Modified;

                        context.SaveChanges();
                    }

                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }        
    }
}
