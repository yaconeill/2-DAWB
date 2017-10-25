/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sessiontrack;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yaco
 */
public class SessionTrackServlet extends HttpServlet {

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
//        try (PrintWriter out = response.getWriter()) {
//            /* TODO output your page here. You may use following sample code. */
//            out.println("<!DOCTYPE html>");
//            out.println("<html>");
//            out.println("<head>");
//            out.println("<title>Servlet SessionTrackServlet</title>");
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet SessionTrackServlet at " + request.getContextPath() + "</h1>");
//            out.println("</body>");
//            out.println("</html>");
//        }
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
        // Crea un objeto sesión si este no existe
        HttpSession session = request.getSession(true);
        //Obtiene el tiempo de inicio de sesión
        Date createTime = new Date(session.getCreationTime());
        // Obtiene el momento de acceso de la última vez
        Date lastAccessTime = new Date(session.getLastAccessedTime());
        String title = "Bienvenido de nuevo a mi página";
        Integer visitCount = 0;
        String visitCountKey = "visitCount";
        String userIDKey = "userID";
        String userID = "ABCD";
        // Comprueba si eres nuevo
        if (session.isNew()) {
            title = "Bienvenido a mi página WEB";
            session.setAttribute(userIDKey, userID);
        } else {
            visitCount = (Integer) session.getAttribute(visitCountKey);
            visitCount = visitCount + 1;
            userID = (String) session.getAttribute(userIDKey);
        }
        session.setAttribute(visitCountKey, visitCount);
        // Obtiene response generando la salida en forma de código html
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String docType
                = "<!doctype html public \"-//w3c//dtd html 4.0 "
                + "transitional//en\">";
        out.println(docType
                + "<html>"
                + "<head><title>" + title + "</title></head>"
                + "<body bgcolor = \"#f0f0f0\">"
                + "<h1 align = \"center\">" + title + "</h1>"
                + "<h2 align = \"center\">Session Infomation</h2>"
                + "<table border = \"1\" align = \"center\">"
                + "<tr bgcolor = \"#949494\">"
                + " <th>Session info</th><th>value</th>"
                + "</tr >"
                + "<tr>"
                + " <td>id</td>"
                + " <td>" + session.getId() + "</td>"
                + "</tr >"
                + "<tr>"
                + " <td>Creation Time</td>"
                + " <td>" + createTime + " </td>"
                + "</tr>"
                + "<tr>"
                + "<td>Time of Last Access</td>"
                + "<td>" + lastAccessTime + " </td>"
                + "</tr>"
                + "<tr>"
                + "<td>User ID</td>"
                + "<td>" + userID + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td>Number of visits</td>"
                + " <td>" + visitCount + "</td>"
                + "</tr>"
                + "</table>"
                + "</body>"
                + "</html>");
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
