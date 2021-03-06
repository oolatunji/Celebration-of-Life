﻿using CelebrationOfLife.Library.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CelebrationOfLife.Library.Data
{
    public class UserDL
    {
        public UserDL()
        {

        }

        public static bool Save(User user)
        {
            try
            {                                
                using (var context = new ColDBEntities())
                {                    
                    context.Users.Add(user);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool UserExists(User user)
        {
            try
            {
                var existingUser = new User();
                using (var context = new ColDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.Username.Equals(user.Username))
                                    .FirstOrDefault();
                }

                if (existingUser == null)
                    return false;
                else
                    return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static User RetrieveUserByUsername(string username)
        {
            try
            {
                var existingUser = new User();
                using (var context = new ColDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.Username.Equals(username))
                                    .FirstOrDefault();
                }

                return existingUser;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ChangePassword(string username, string password)
        {
            try
            {
                User existingUser = new User();
                using (var context = new ColDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.Username == username)
                                    .FirstOrDefault();
                }

                if (existingUser != null)
                {                    
                    existingUser.Password = password;                    
                    using (var context = new ColDBEntities())
                    {
                        context.Entry(existingUser).State = EntityState.Modified;

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

        public static List<User> RetrieveUsers()
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var users = context.Users.ToList();

                    return users;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static User RetrieveUserByID(long? userID)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var users = context.Users
                                            .Where(f => f.ID == userID);

                    return users.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static User AuthenticateUser(string username, string password)
        {
            try
            {
                using (var context = new ColDBEntities())
                {
                    var users = context.Users
                                            .Where(f => f.Username == username && f.Password == password);

                    return users.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(User user)
        {
            try
            {
                User existingUser = new User();
                using (var context = new ColDBEntities())
                {
                    existingUser = context.Users
                                    .Where(t => t.ID == user.ID)
                                    .FirstOrDefault();
                }

                if (existingUser != null)
                {
                    existingUser.Email = user.Email;
                    existingUser.Lastname = user.Lastname;
                    existingUser.Othernames = user.Othernames;

                    using (var context = new ColDBEntities())
                    {
                        context.Entry(existingUser).State = EntityState.Modified;

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
