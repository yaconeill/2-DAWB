/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.consumoelectrico_Aymediacoan.buscador.web;

import com.mysql.jdbc.PreparedStatement;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.*;

/**
 *
 * @author Yaco
 */
public class BuscadorConsumoElectricoServlet extends HttpServlet {

    static private String dbUrl;
    static private String dbUser;
    static private String dbPassword;
    static private Integer dbPageSize;
    private final Integer DEFAULT_PAGESIZE = 10;
    static private String driverClassName;
    static private Integer tableSize;
    static List<Cliente> clientList;

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
    }

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
//        createCookie(request, response,"size");
        String name = request.getParameter("nameToSearch");
        dbPageSize = Integer.parseInt(request.getParameter("pageSize"));
        Name nombre = new Name();
        nombre.setName(name);
        request.setAttribute("nameToSearch", nombre);
//        request.setAttribute("numReg", numReg);
        getServletContext().getRequestDispatcher("/misclientesList.jsp").forward(request, response);
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
    }

// Extrae los datos de los clientes de la base de datos y los guarda en una lista de tipo Cliente
    public static List retrieveDataClient(Integer posi) {
        Connection conexion = null;
        clientList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName(driverClassName);
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            String cadena = "select * from misclientes LIMIT " + posi + "," + dbPageSize;
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery(cadena);
            // Se recorre el ResultSet, mostrando por pantalla los resultados.

            while (rs.next()) {
                Cliente newClient = new Cliente(rs.getInt("id"), rs.getString(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8));
                clientList.add(newClient);
            }
            return clientList;
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return null;
    }

    public static Integer rowsInDB() {
        Connection conexion = null;
        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // con el usuario 2dawa y contraseña 2dawa
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            String cadena = "select count(id) from misclientes";
            ResultSet rs = s.executeQuery(cadena);
            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                tableSize = rs.getInt(1);
            }
            return tableSize;
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return null;
    }

    public static void setCookie(HttpServletRequest request, HttpServletResponse response, String PAGE_SIZE_COOKIE_NAME) {
        Integer customPageSize = Integer.parseInt(request.getParameter("pageSize"));
        if (customPageSize != null) {
            Cookie pageSizeCookie = new Cookie(PAGE_SIZE_COOKIE_NAME, customPageSize.toString());
            // 1 año de vida
            pageSizeCookie.setMaxAge(24 * 60 * 60 * 365);
            pageSizeCookie.setPath(request.getContextPath());
            response.addCookie(pageSizeCookie);
        }
    }

    public static void setCookieText(HttpServletRequest request, HttpServletResponse response, String NAME, String VALUE) {
//        Integer customPageSize = Integer.parseInt(request.getParameter("pageSize"));
        if (VALUE != null) {
            Cookie pageSizeCookie = new Cookie(NAME, VALUE);
            // 1 año de vida
            pageSizeCookie.setMaxAge(24 * 60 * 60 * 365);
            pageSizeCookie.setPath(request.getContextPath());
            response.addCookie(pageSizeCookie);
        }
    }

    public static Cookie getCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) {
            return null;
        }
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equalsIgnoreCase(cookieName)) {
                return cookie;
            }
        }
        return null;
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
            this.dbPageSize = rb.getString("database.pageSize") == null ? DEFAULT_PAGESIZE : Integer.parseInt(rb.getString("database.pageSize"));
            this.driverClassName = rb.getString("database.driver");
            Class.forName(driverClassName);

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(BuscadorConsumoElectricoServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }
}
