using CelebrationOfLife.Library.Model.EntityFramework;
using CelebrationOfLife.Library.Process;
using CelebrationOfLife.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CelebrationOfLife.Web.Controllers
{
    public class ContentAPIController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SaveContent([FromBody]WebContentModel webContent)
        {
            try
            {
                string errMsg = string.Empty;
                bool result = false;

                if (webContent.Category.Type == "Text")
                {
                    CategoryText categoryText = new CategoryText();
                    categoryText.CategoryID = webContent.Category.ID;
                    categoryText.Text = webContent.CategoryText;

                    result = CategoryTextPL.Save(categoryText, out errMsg);
                }
                else if (webContent.Category.Type == "Image")
                {
                    List<CategoryGallery> categoryGalleries = new List<CategoryGallery>();

                    webContent.Images.ToList().ForEach(base64Image =>
                    {
                        CategoryGallery categoryGallery = new CategoryGallery();
                        categoryGallery.CategoryID = webContent.Category.ID;
                        categoryGallery.Image = System.Convert.FromBase64String(base64Image);

                        categoryGalleries.Add(categoryGallery);
                    });

                    result = CategoryGalleryPL.Save(categoryGalleries, out errMsg);
                }

                if (string.IsNullOrEmpty(errMsg))
                {
                    if (result)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, string.Format("Content was published successfully."));
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
                    }
                }
                else
                {
                    var response = Request.CreateResponse(HttpStatusCode.BadRequest, errMsg);
                    return response;
                }
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateContent([FromBody]WebContentModel webContent)
        {
            try
            {
                bool result = false;

                if (webContent.Category.Type == "Text")
                {
                    CategoryText categoryText = new CategoryText();
                    categoryText.CategoryID = webContent.Category.ID;
                    categoryText.Text = webContent.CategoryText;

                    result = CategoryTextPL.Update(categoryText);
                }
                else if (webContent.Category.Type == "Image")
                {
                    List<CategoryGallery> categoryGalleries = new List<CategoryGallery>();

                    webContent.Images.ToList().ForEach(base64Image =>
                    {
                        CategoryGallery categoryGallery = new CategoryGallery();
                        categoryGallery.CategoryID = webContent.Category.ID;
                        categoryGallery.Image = System.Convert.FromBase64String(base64Image);

                        categoryGalleries.Add(categoryGallery);
                    });

                    result = CategoryGalleryPL.Update(categoryGalleries);
                }
                
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, string.Format("Content was updated successfully")) : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpGet]
        public HttpResponseMessage RetrieveContent()
        {
            try
            {
                IEnumerable<object> content = GetWebContent(CategoryGalleryPL.RetrieveCategoryImages(), CategoryTextPL.RetrieveCategoryTexts());
                return Request.CreateResponse(HttpStatusCode.OK, new { data = content });
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.ReasonPhrase = ex.Message;
                return response;
            }
        }

        private List<object> GetWebContent(List<CategoryGallery> images, List<CategoryText> texts)
        {
            List<object> categoryTexts = new List<object>();

            if (texts.Any())
            {
                texts.ForEach(categoryText =>
                {
                    categoryTexts.Add(new
                    {
                        Category = new
                        {
                            ID = categoryText.Category.ID,
                            Name = categoryText.Category.Name,
                            Type = categoryText.Category.Type,
                            Content = categoryText.Text
                        }
                    });
                });
            }

            if (images.Any())
            {
                Dictionary<int, ICollection<string>> tempImages = new Dictionary<int, ICollection<string>>();
                Dictionary<int, Category> categoryGalleryDict = new Dictionary<int, Category>();

                images.ForEach(image =>
                {
                    string byte64Image = "data:image/png;base64," + System.Convert.ToBase64String(image.Image, 0, image.Image.Length);

                    if (!tempImages.ContainsKey(image.Category.ID))
                    {
                        ICollection<string> byte64Images = new List<string>();
                        byte64Images.Add(byte64Image);
                        tempImages.Add(image.Category.ID, byte64Images);
                        categoryGalleryDict.Add(image.Category.ID, image.Category);
                    }
                    else
                    {
                        tempImages[image.Category.ID].Add(byte64Image);
                    }
                });

                tempImages.Keys.ToList().ForEach(key =>
                {
                    Category category = categoryGalleryDict[key];
                    ICollection<string> galleryImages = tempImages[key];

                    categoryTexts.Add(new
                    {
                        Category = new
                        {
                            ID = category.ID,
                            Name = category.Name,
                            Type = category.Type,
                            Content = galleryImages
                        }
                    });
                });
            }

            return categoryTexts;
        }
    }
}
