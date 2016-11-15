using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Outsourcing.Core.Common
{
    public class StringConvert
    {

        public static String ConvertShortName(String strVietNamese)
        {
            //Loại bỏ dấu ':'
            char[] delimiter = { ':', '?', '"', '/', '!', ',', '-', '=', '%', '$', '&', '*' };
            String[] subString = strVietNamese.Split(delimiter);
            strVietNamese = "";
            for (int i = 0; i < subString.Length; i++)
            {
                strVietNamese += subString[i];
            }
            //Loại bỏ tiếng việt
            const string textToFind = " áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ";
            const string textToReplace = "-aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
            int index = -1;
            while ((index = strVietNamese.IndexOfAny(textToFind.ToCharArray())) != -1)
            {
                int index2 = textToFind.IndexOf(strVietNamese[index]);
                strVietNamese = strVietNamese.Replace(strVietNamese[index], textToReplace[index2]);
            }

            return strVietNamese.ToLower();
        }

        public static String product(int price,int quantity)
        {
            return (price * quantity).ToString("##,###,##0");
        }

        public static String product(double rate, double sum)
        {
            return (rate * sum).ToString("##,###,##0");
        }

        public static String divide(double total, int quan)
        {
            return (total/quan).ToString("##,###,##0");
        }

        public static String total_final(double rate, double sum)
        {
            return (sum * (1 + rate)).ToString("##,###,##0");
        }


    }
}
