using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Data
{
    public class CategoryTextDL
    {
        public static bool Save(CategoryText categoryText)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    context.CategoryTexts.Add(categoryText);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool CategoryTextExists(CategoryText categoryText)
        {
            try
            {
                var existingCategory = new CategoryText();
                using (var context = new ColDBEntities())
                {
                    existingCategory = context.CategoryTexts
                                    .Where(t => t.CategoryID.Equals(categoryText.CategoryID))
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

        public static List<CategoryText> RetrieveCategoryTexts()
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var categories = context.CategoryTexts.Include("Category").ToList();

                    return categories;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static CategoryText RetrieveCategoryTextByID(long? id)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var categories = context.CategoryTexts.Include("Category")
                                            .Where(f => f.CategoryID == id);

                    return categories.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(CategoryText categoryText)
        {
            try
            {
                CategoryText existingCategory = new CategoryText();
                using (var context = new ColDBEntities())
                {
                    existingCategory = context.CategoryTexts
                                    .Where(t => t.CategoryID == categoryText.CategoryID)
                                    .FirstOrDefault();
                }

                if (existingCategory != null)
                {
                    existingCategory.Text = categoryText.Text;

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
