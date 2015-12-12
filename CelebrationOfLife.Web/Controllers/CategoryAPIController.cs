using CelebrationOfLife.Library.Model.EntityFramework;
using CelebrationOfLife.Library.Process;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CelebrationOfLife.Web.Controllers
{
    public class CategoryAPIController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SaveCategory([FromBody]Category category)
        {
            try
            {
                string errMsg = string.Empty;

                bool result = CategoryPL.Save(category, out errMsg);
                if (string.IsNullOrEmpty(errMsg))
                {
                    if (result)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, string.Format("Category: {0} was added successfully.", category.Name));
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
        public HttpResponseMessage UpdateCategory([FromBody]Category category)
        {
            try
            {
                bool result = CategoryPL.Update(category);
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, string.Format("Category: {0} was updated successfully", category.Name)) : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpGet]
        public HttpResponseMessage RetrieveCategories()
        {
            try
            {
                IEnumerable<object> categories = CategoryPL.RetrieveCategories();
                return Request.CreateResponse(HttpStatusCode.OK, new { data = categories });
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.ReasonPhrase = ex.Message;
                return response;
            }
        }
    }
}
