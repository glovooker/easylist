using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.DAOs
{
    public class FileDAO
    {

        public static void SaveText(string text)
        {
            using (StreamWriter w = File.AppendText("log.txt"))
            {
                Log(text, w);
            }

        }

        private static void Log(string logMessage, TextWriter w)
        {
            w.WriteLine("\r\nLog Entry : ");
            w.WriteLine($"{DateTime.Now.ToLongTimeString()} {DateTime.Now.ToLongDateString()}");
            w.WriteLine("  :");
            w.WriteLine($"  :{logMessage}");
            w.WriteLine("-----------------------------");
        }

    }
}
