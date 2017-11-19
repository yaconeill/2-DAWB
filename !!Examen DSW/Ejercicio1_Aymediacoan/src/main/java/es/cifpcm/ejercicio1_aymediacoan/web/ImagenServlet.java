/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.ejercicio1_aymediacoan.web;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javafx.scene.control.Separator;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import sun.net.ftp.FtpReplyCode;

/**
 *
 * @author Yaco
 */
public class ImagenServlet extends HttpServlet {

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
//            out.println("<title>Servlet ImagenServlet</title>");            
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet ImagenServlet at " + request.getContextPath() + "</h1>");
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
        String[] estaciones = {"invierno", "primavera", "verano", "otoño"};
        String estacion = "";
        //Invierno - Diciembre -> enero -> febrero -> 
        //Primavera - marzo -> abril -> mayo -> 
        // verano - junio -> julio -> agosto -> 
        // otoño - sept -> octubre -> noviembre -> 
        int mes = Integer.parseInt(request.getParameter("mes"));
        switch (mes) {
            case 12:
            case 1:
            case 2:
                estacion = estaciones[0];
                break;
            case 3:
            case 4:
            case 5:
                estacion = estaciones[1];
                break;
            case 6:
            case 7:
            case 8:
                estacion = estaciones[2];
                break;
            case 9:
            case 10:
            case 11:
                estacion = estaciones[3];
                break;
        }
        printOnScreen(request, response, estacion);
    }

    public static void printOnScreen(HttpServletRequest request, HttpServletResponse response, String estacion) throws IOException {
        String src = request.getContextPath() + "/images/" + estacion + ".jpg";
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ImagenServlet</title>");
            out.println("<link rel=\"stylesheet\" href=\"" + request.getContextPath() + "/css/style.css\">");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1> Estación: " + estacion + "</h1>");
            out.println("<p><img src=\"" + src + "\"/>");
            out.println("</body>");
            out.println("</html>");
        }
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
