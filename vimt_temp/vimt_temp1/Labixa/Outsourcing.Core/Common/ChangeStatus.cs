using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Outsourcing.Core.Common
{
    public static class Statuses
    {
        public static string PENDING_FOR_VALIDATION = "Pending For Validation";
        public static string REJECT_BY_REQUESTER_MANAGER = "Reject By Requestor Manager";
        public static string PENDING_FOR_SIGNATURE = "Pending for signature";
        public static string WAITING_FOR_COLLECT = "waiting for collect";
        public static string REJECT_BY_ACCOUNTING_MANAGER = "Reject by VN Accounting Team";
        public static string WAITING_FOR_PAYMENT = "waiting for payment";
        public static string DONE = "done";
	 }
    public static class ChangeStatus
    {
        public static string ChangeStatusInvoice(string role, string recentStatus, bool isReject, bool? isPrinted)
        {
            if(recentStatus.ToLower().Equals("pending for approve"))
            {
                
                if (!role.ToLower().Trim().Equals("requestor manager"))
                {
                    //wrong role
                    return null;
                }
                else
                {
                    if (isReject == false)
                    {
                        //reject by requester
                        return Statuses.PENDING_FOR_VALIDATION.Trim();
                    }
                    else
                    {
                        //approve
                        return Statuses.REJECT_BY_REQUESTER_MANAGER.Trim();
                    }
                }
            }
            
            else if (recentStatus.ToLower().Trim().Equals("pending for validation"))
            {
                if (role.ToLower().Trim().Equals("accountant"))
                {
                    return Statuses.PENDING_FOR_SIGNATURE.Trim();
                }
                else 
                { 
                    return null; 
                }
            }
            else if (recentStatus.ToLower().Trim().Equals("pending for signature"))
            {
            
                if (role.ToLower().Trim().Equals("accountant manager"))
                {
                    if (isReject == true)
                    {
                        return Statuses.REJECT_BY_ACCOUNTING_MANAGER.Trim();
                    }
                    else
                    {
                        return Statuses.WAITING_FOR_COLLECT.Trim();
                    }
                }
                else
                {
                    return null;
                }
            }
            else if (recentStatus.ToLower().Trim().Equals("waiting for collect"))
            {

                if (role.ToLower().Trim().Equals("accountant"))
                {
                    if (isReject == true)
                    {
                        return Statuses.REJECT_BY_ACCOUNTING_MANAGER.Trim();
                    }
                    else
                    {
                        return Statuses.WAITING_FOR_PAYMENT.Trim();
                    }
                }
                else
                {
                    return null;
                }
            }
            else if (recentStatus.ToLower().Trim().Equals("waiting for payment"))
            {

                if (role.ToLower().Trim().Equals("accountant"))
                {
                    if (isReject == true)
                    {
                        return Statuses.REJECT_BY_ACCOUNTING_MANAGER.Trim();
                    }
                    else
                    {
                        return Statuses.DONE.Trim();
                    }
                }
                else
                {
                    return null;
                }
            }
            

            //switch (switch_on)
            //{
            //    default:
            //}

            return null;
        }
    }
}
