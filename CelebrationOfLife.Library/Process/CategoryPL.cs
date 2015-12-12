using CelebrationOfLife.Library.Data;
using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Process
{
    public class CategoryPL
    {
        public static bool Save(Category category, out string message)
        {
            try
            {
                if (CategoryDL.CategoryExists(category))
                {
                    message = string.Format("Category with name: {0} exists already", category.Name);
                    return false;
                }
                else
                {
                    message = string.Empty;
                    if (CategoryDL.Save(category))
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

        public static List<object> RetrieveCategories()
        {
            try
            {
                List<object> categories = new List<object>();
                
                if(CategoryDL.RetrieveCategories().Any())
                {
                    CategoryDL.RetrieveCategories().ForEach(category =>
                    {
                        categories.Add(new { Name = category.Name, ID = category.ID });
                    });
                }

                return categories;
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
                return CategoryDL.Update(category);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
