using CelebrationOfLife.Library.Data;
using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Process
{
    public class CategoryTextPL
    {
        public static bool Save(CategoryText categoryText, out string message)
        {
            try
            {
                if (CategoryTextDL.CategoryTextExists(categoryText))
                {
                    message = string.Format("Content exists already for the selected category");
                    return false;
                }
                else
                {
                    message = string.Empty;
                    if (CategoryTextDL.Save(categoryText))
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

        public static List<CategoryText> RetrieveCategoryTexts()
        {
            try
            {
                return CategoryTextDL.RetrieveCategoryTexts();
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
                return CategoryTextDL.Update(categoryText);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
