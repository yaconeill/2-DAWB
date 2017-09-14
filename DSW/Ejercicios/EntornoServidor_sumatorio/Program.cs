using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntornoServidor_sumatorio
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> Ist = new List<int>();
            Ist.Add(1); Ist.Add(2); Ist.Add(3);
            int r = 0;
            foreach (var i in Ist)
            {
                r = r + i;
            }
            Console.WriteLine("Hola el resultado es: "+ r);
            Console.ReadLine();
        }
    }
}
