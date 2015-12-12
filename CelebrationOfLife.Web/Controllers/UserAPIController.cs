using CelebrationOfLife.Library.Model.EntityFramework;
using CelebrationOfLife.Library.Model.Utility;
using CelebrationOfLife.Library.Process;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CelebrationOfLife.Web.Controllers
{
    public class UserAPIController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SaveUser([FromBody]User user)
        {
            try
            {
                    string errMsg = string.Empty;

                    user.Password = PasswordHash.MD5Hash("password");

                    bool result = UserPL.Save(user, out errMsg);
                    if (string.IsNullOrEmpty(errMsg))
                    {
                        if (result)
                        {
                            return Request.CreateResponse(HttpStatusCode.OK, string.Format("User: {0} was added successfully.", user.Username));
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
        public HttpResponseMessage UpdateUser([FromBody]User user)
        {
            try
            {
                bool result = UserPL.Update(user);
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, string.Format("User: {0} was updated successfully", user.Username)) : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpPut]
        public HttpResponseMessage ChangePassword([FromBody]User changePassword)
        {
            try
            {
                string password = PasswordHash.MD5Hash(changePassword.Password);
                string username = changePassword.Username;
                bool result = UserPL.ChangePassword(username, password);
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, "Password was updated successfully.") : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpGet]
        public HttpResponseMessage RetrieveUsers()
        {
            try
            {
                IEnumerable<User> users = UserPL.RetrieveUsers();
                return Request.CreateResponse(HttpStatusCode.OK, new { data = users });
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.ReasonPhrase = ex.Message;
                return response;
            }
        }

        [HttpPost]
        public HttpResponseMessage AuthenticateUser([FromBody]User user)
        {
            try
            {
                string password = PasswordHash.MD5Hash(user.Password);
                User userObj = UserPL.AuthenticateUser(user.Username, password);
                if (userObj != null)
                    return Request.CreateResponse(HttpStatusCode.OK, userObj);
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid/Password");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }
    }
}
