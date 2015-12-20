using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CelebrationOfLife.Web.Models
{
    public class WebContentModel
    {
        public CategoryModel Category { get; set; }
        public string CategoryText { get; set; }
        public virtual ICollection<string> Images { get; set; }
        public virtual ICollection<string> DeletedImages { get; set; }
    }

    public class CategoryModel
    {
        public int ID { get; set; }
        public string Type { get; set; }
    }
}