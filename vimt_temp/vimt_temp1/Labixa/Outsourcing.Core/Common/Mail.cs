using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
namespace Labixa.Models
{
    public class Mail
    {
        public static void SendMail(string content,string toMail)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(toMail);
                mail.From = new MailAddress("VIMT@intel.com");
                mail.Subject = "Mail From VIMT Please No Reply";
                mail.Body = content;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.intel.com";
                smtp.Port = 25;
                smtp.EnableSsl = false;
                smtp.UseDefaultCredentials = false;
                smtp.Send(mail);
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}