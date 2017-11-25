/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.micafeteria_aymediacoan.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Yaco
 */
public class cafeOrderServlet extends HttpServlet {

    static private String dbUrl;
    static private String dbUser;
    static private String dbPassword;
    static private String driverClassName;
//    static private List<String> lista;
    private static final double solo = 1;
    private static final double descafeinado = 1.2;

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
//            out.println("<title>Servlet cafeOrderServlet</title>");
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet cafeOrderServlet at " + request.getContextPath() + "</h1>");
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
        boolean order;
        order = insertOrder(request, response);
        if (!order) {
            //request.setAttribute("loginBean", usuario);
            getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
        getServletContext().getRequestDispatcher("/success.jsp").forward(request, response);

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

    public static boolean insertOrder(HttpServletRequest request, HttpServletResponse response) {
        String[] lista = {"lecheNormal", "lecheSemidesnatada", "lecheDesnatada", "lecheCondensada", "lecheSoja", "licor", "canela", "nata"};
        double precio;
        String tipo;
        StringBuffer extras = new StringBuffer();
        int numExtra = 0;
        for (int i = 0; i < lista.length; i++) {
            String element = lista[i];
            String name = request.getParameter(element);
            if (name != null) {
                numExtra += 1;
                if (numExtra > 1) {
                    extras.append(", ");
                }
                extras.append(element);
            }
        }
        int selected = Integer.parseInt(request.getParameter("tipo"));
        if (selected == 1) {
            tipo = "sòlo";
            precio = solo;
        } else {
            tipo = "descafeinado";
            precio = descafeinado;
        }
        double total = precio + (numExtra) * 0.5;
        Order nuevaOrden = new Order(1, tipo, extras.toString(), numExtra, total);
        Connection conn = null;
        response.setContentType(driverClassName);

        try { // Cargar el driver
            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword); // Se obtiene una conexión con la base de datos.
            // Se crea un Statement, para realizar el query
            String query = "INSERT INTO pedidos(id_cafe, extras, precio) VALUES (?,?,?)";
            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                int _id_cafe = selected;
                String _extras = nuevaOrden.getExtras();
                double _precio = nuevaOrden.getTotal();
                pstmt.setInt(1, _id_cafe);
                pstmt.setString(2, _extras);
                pstmt.setDouble(3, _precio);
                try {
                    int rs = pstmt.executeUpdate();
                    return true;

                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return false;
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        try {
            String configBundleName = config.getInitParameter("app.config");
            ResourceBundle rb = ResourceBundle.getBundle(configBundleName);
            this.dbUrl = rb.getString("database.url");
            this.dbUser = rb.getString("database.user");
            this.dbPassword = rb.getString("database.password");
            this.driverClassName = rb.getString("database.driver");
            Class.forName(driverClassName);

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(cafeOrderServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }
}
