/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.calendar.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Yaco
 */
public class VerCalendarioServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            response.setContentType("text/html");
            int m = Integer.parseInt(request.getParameter("mes"));
            int year = 2017;
            Calendar calendar = new GregorianCalendar(year, m, 1);
            Calendar previousMonth;
            if (m < 0) {
                previousMonth = new GregorianCalendar(year - 1, 12, 1);
            } else {
                previousMonth = new GregorianCalendar(year, (m - 1), 1);
            }
            DateFormatSymbols dfs = new DateFormatSymbols();

            calendar.setFirstDayOfWeek(2);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            previousMonth.set(Calendar.DAY_OF_MONTH, 1);

            int maxDays = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
            int maxDaysPrevMonth = previousMonth.getActualMaximum(Calendar.DAY_OF_MONTH);

            SimpleDateFormat sdf = new SimpleDateFormat("EEE");
            String dayStartMonth = sdf.format(calendar.getTime());
            String showYear = (calendar.getTime().toString()).substring((calendar.getTime().toString()).length() - 4);
            String nameMonth = dfs.getMonths()[calendar.get(Calendar.MONTH)];
            int prevDays = 0;
            switch (dayStartMonth) {
                case "lun":
                    prevDays = 0;
                    break;
                case "mar":
                    prevDays = 1;
                    break;
                case "mié":
                    prevDays = 2;
                    break;
                case "jue":
                    prevDays = 3;
                    break;
                case "vie":
                    prevDays = 4;
                    break;
                case "sáb":
                    prevDays = 5;
                    break;
                case "dom":
                    prevDays = 6;
                    break;
            }
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Ver Calendario</title>");
            out.println("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">");
            out.println("<link rel=\"stylesheet\" href=\"" + request.getContextPath() + "/css/style.css\">");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1 style='text-align:center;'>Calendario</h1>");
            out.println("<div class='calendar'><table>");
            out.println("<tr>");
            out.println("<td colspan='5'>" + nameMonth + " de " + showYear + "</td>");
            out.println("<td><a href='?mes=" + (m - 1) + "'><i class=\"fa fa-angle-left\" style=\"font-size:30px\"></i></a></td>");
            out.println("<td><a href='?mes=" + (m + 1) + "'><i class=\"fa fa-angle-right\" style=\"font-size:30px\"></i></a></td>");
            out.println("</tr>");
            out.println("<tr>");
            //String[][] daysmonth = new String[6][6];

            String[] daysOfWeek = {"L", "M", "X", "J", "V", "S", "D"};
            for (String d : daysOfWeek) {
                out.println("<td>");
                out.println(d);
                out.println(" </td>");
            }
            out.println("</tr>");
            int a;
            if (prevDays <= 5 && maxDays < 31 || prevDays < 5 && maxDays == 31) {
                a = 5;
            } else {
                a = 6;
            }
            int j;
            int k = maxDaysPrevMonth - prevDays + 1;
            for (int i = 0, d = 1, dd = 1; i < a; i++) {
                out.println("<tr>");
                for (j = 0; j < 7; j++, k++) {
                    if (k <= maxDaysPrevMonth && i == 0) {
                        //daysmonth[i][] 
                        out.println("<td class='otherMonth'>" + k + "</td>");
                    } else {
                        if (d <= maxDays) {
                            out.println("<td>" + d + "</td>");
                            d++;
                        } else {
                            out.println("<td class='otherMonth'>" + dd + "</td>");
                            dd++;
                        }
                    }
                }
                out.println("</tr>");
            }
            out.println("</table></div></body></html>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
