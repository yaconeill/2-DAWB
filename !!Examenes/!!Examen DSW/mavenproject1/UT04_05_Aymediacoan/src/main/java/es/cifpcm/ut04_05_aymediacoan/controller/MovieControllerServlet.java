/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.ut04_05_aymediacoan.controller;

import java.io.IOException;
import java.sql.*;
import java.util.ResourceBundle;
import java.util.logging.*;
import javax.servlet.*;
import javax.servlet.http.*;
import es.cifpcm.ut04_05_aymediacoan.model.Movie;
import es.cifpcm.ut04_05_aymediacoan.model.Error;

/**
 *
 * @author Yaco
 */
public class MovieControllerServlet extends HttpServlet {

    private static String dbUrl;
    private static String dbUser;
    private static String dbPassword;
    private static String driverClassName;

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
        boolean success;
        Movie newMovie = new Movie();
        String errorMessage = "";
        int idCategory = Integer.parseInt(request.getParameter("category"));
        String title = request.getParameter("title");
        if (title.length() == 0) {
            success = false;
            errorMessage = "No se ha introducido un título";
        } else {
            newMovie.setIdCategory(idCategory);
            newMovie.setTitle(title);
            success = insertMovie(request, response, newMovie);
        }
        if (!success) {
            Error error = new Error(errorMessage);
            //request.setAttribute("error", error);
            getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
        request.setAttribute("movie", newMovie);
        getServletContext().getRequestDispatcher("/success.jsp").forward(request, response);
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

    public static boolean insertMovie(HttpServletRequest request, HttpServletResponse response, Movie newMovie) {

        Connection conn = null;
        response.setContentType(driverClassName);

        try { // Cargar el driver
            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword); // Se obtiene una conexión con la base de datos.
            // Se crea un Statement, para realizar el query
            String query = "INSERT INTO movies(IdCategory, Title) VALUES (?,?)";
            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                int IdCategory = newMovie.getIdCategory();
                String title = newMovie.getTitle();
                pstmt.setInt(1, IdCategory);
                pstmt.setString(2, title);
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
            Logger.getLogger(MovieControllerServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }
}
