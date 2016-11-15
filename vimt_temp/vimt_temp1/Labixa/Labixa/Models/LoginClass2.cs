using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.DirectoryServices.AccountManagement;
using System.Diagnostics;
using System.DirectoryServices.ActiveDirectory;
namespace DAS.Models
{
    public static class LoginClass2
    {
        public class Member
        {
            public string WWID { get; set; }
            public string ccMailName { get; set; }
            public string DomainAddress { get; set; }
            public string shortId { get; set; }
        }
        //static LoginClass()
        //{
        //}
        public static bool IsMemberOfGroup(string groupName, string username)
        {
            //Crete group and user
            UserPrincipal user = null;
            GroupPrincipal group = null;
            //Get All Domain Name
            using (var forest = Forest.GetCurrentForest())
            {
                
                foreach (Domain domain in forest.Domains)
                {
                    Debug.WriteLine(domain.Name);
                    //Create Principal context base on domain name
                    var principal = new PrincipalContext(ContextType.Domain, domain.Name);
                    //Get user in that domain
                    if (user==null)
                    {
                        user = UserPrincipal.FindByIdentity(principal, username.ToLower());
                    }
                    //Check group if group is belonged to this domain
                    if (group==null)
                    {
                        group = GroupPrincipal.FindByIdentity(principal, groupName);
                    }
                    if (group!=null && user!=null)
                    {

                        if (group != null)
                        {
                            foreach (Principal p in group.GetMembers(true))
                            {
                                Debug.WriteLine(p.UserPrincipalName);
                            }
                        }
                        return user.IsMemberOf(group);
                        break;
                    }
                    domain.Dispose();
                }
                
                return false;
              
            }

         
            ////test get all member of group
           
        }

        
        

        public static Member GetMember(string ip)
        {
            try
            {
                IPAddress myIP = IPAddress.Parse(ip);
                IPHostEntry GetIPHost = Dns.GetHostEntry(myIP);
                List<string> compName = GetIPHost.HostName.ToString().Split('.').ToList();
                string name = compName.First();
                name = name.Substring(0, name.IndexOf('-'));
                Member member = null;
                using (SqlConnection sqlconnection = new SqlConnection(
                    "SERVER=cdisdb.intel.com;UID=HighlandCoffee" +
                    ";PWD=PnVE8!Ah;Address=cdisdb.intel.com,3180;DATABASE=x500;Network=DBMSSOCN"
                ))
                {
                    string query = "SELECT WWID, ccMailName, DomainAddress, MgrWWID " +
                        "FROM WorkerPublicExtended (nolock) " +
                        "WHERE (LocCountryName = 'VIET NAM' AND BadgeType = 'BB' AND UPPER(ShortID) = '" + name.ToUpper().ToString() + "') ";
                    SqlCommand sqlCommand = new SqlCommand(query, sqlconnection);
                    //sqlCommand.Parameters.AddWithValue("@A", "Value");
                    sqlconnection.Open();
                    SqlDataReader dr = sqlCommand.ExecuteReader();
                    while (dr.Read())
                    {
                        member = new Member();
                        member.WWID = dr["WWID"].ToString();
                        member.ccMailName = dr["ccMailName"].ToString();
                        member.DomainAddress = dr["DomainAddress"].ToString();
                        member.shortId = name;
                    }
                    sqlconnection.Close();
                }
                return member;
            }
            catch (Exception)
            {
                return null;
                throw;
            }
        }
    }
}