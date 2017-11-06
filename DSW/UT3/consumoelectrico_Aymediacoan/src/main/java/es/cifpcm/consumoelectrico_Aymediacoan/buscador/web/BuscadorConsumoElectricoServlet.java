/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.consumoelectrico_Aymediacoan.buscador.web;

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
    static List<Cliente> clientList;
    static List<Measures> measuresList;

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
        String name = request.getParameter("nameToSearch");
        retrieveDataClient();
        searchByClient(name);
        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet BuscadorConsumoElectricoServlet</title>");
            out.println("<link rel=\"stylesheet\" href=\"" + request.getContextPath() + "/css/style.css\">");
            out.println("</head>");
            out.println("<body>");
            out.print("<h1>Buscador Consumo Electrico <a href=\"" + request.getContextPath() + "/index.html\">Inicio</a></h1>");
            out.print("");
            showClients(out);
            sumOfMeasures(out);
            showMeasures(out);
            out.println("</body>");
            out.println("</html>");
        } catch (Exception e) {
            System.out.println(e.getMessage());
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

    // Extrae los datos de los clientes de la base de datos y los guarda en una lista de tipo Cliente
    public static void retrieveDataClient() {
        Connection conexion = null;
        clientList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            s.setMaxRows(dbPageSize);
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from misclientes");
            // Se recorre el ResultSet, mostrando por pantalla los resultados.

            while (rs.next()) {
                Cliente newClient = new Cliente(rs.getInt("id"), rs.getString(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8));
                clientList.add(newClient);
            }
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
    }

    // Extrae los datos de las mediciones de la base de datos y los guarda en una lista de tipo Mediciones
    public static void retrieveDataMeasure(Integer id) {
        Connection conexion = null;
        measuresList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName(driverClassName);
            // Se obtiene una conexión con la base de datos.
            // con el usuario 2dawa y contraseña 2dawa
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from mediciones where Cliente = " + id);
            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                Measures newMeasure = new Measures(rs.getInt(1), rs.getInt(2), rs.getDate(3), rs.getDouble(4));
                measuresList.add(newMeasure);
            }
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
    }

    // Hace una busqueda por el nombre del cliente, y con su id hace una consulta de sus datos de mediciones
    public static void searchByClient(String name) {
        Connection conexion = null;
        Integer id;
        try {

            // Cargar el driver
            Class.forName(driverClassName);

            // Se obtiene una conexión con la base de datos.
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);

            String cadena = "select * from misclientes where nombre = \'" + name + "\'";
            id = getDataClient(conexion, cadena);
            retrieveDataMeasure(id);

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
    }

    // extrae la id de un cliente desde la base de datos, se le pasa la cadena de la consulta y la conexion de la bd, y devuelve la id.
    public static Integer getDataClient(Connection conexion, String cadena) throws SQLException {
        int id = 0;
        try {
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();

            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery(cadena);

            // Se recorre el ResultSet
            while (rs.next()) {
                id = rs.getInt(1);
            }
            return id;
        } catch (SQLException e) {
            System.out.println(e);
        }
        return null;
    }

    // Imprime en pantalla una tabla con los datos de los 10 primeros clientes extrayendo los datos de la lista de tipo Cliente.
    public static void showClients(PrintWriter out) throws IOException {
        String[] header = {"id", "nombre", "apellido", "NombreCalle", "Numero", "CodPostal", "Poblacion", "Provincia"};
        out.println("<table>");
        out.println("<thead>");
        out.println("<tr>");
        for (String field : header) {
            out.println("<th>");
            out.println(field);
            out.println("</th>");
        }
        out.println("</tr>");
        out.println("</thead>");
        out.println("<tbody>");
        for (Cliente client : clientList) {
            out.println("<tr>");
            out.println("<td>");
            out.print(client.getClNo());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getFirstName());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getLastName());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getStreetName());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getNumber());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getPostalCode());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getPopulation());
            out.println("</td>");
            out.println("<td>");
            out.print(client.getProvince());
            out.println("</td>");
            out.println("</tr>");
        }
        out.println("</table>");
    }

    // Crea una tabla, suma las mediciones y las muestra
    public static void sumOfMeasures(PrintWriter out) {
        double sum = 0;
        out.println("<table>");
        out.println("<thead>");
        out.println("<tr>");
        out.println("<th>Suma de mediciones</th>");
        out.println("</tr>");
        out.println("</thead>");
        out.println("<tbody>");
        out.println("<tr>");
        out.println("<td>");
        for (Measures measures : measuresList) {
            sum += measures.getKw();
        }
        out.println(Redondear(sum));
        out.println(" KW</td>");
        out.println("</tr>");
        out.println("</tbody>");
        out.println("</table>");
    }

    public static double Redondear(double numero) {
        return Math.rint(numero * 1000) / 1000;
    }

    // Imprime en pantalla una tabla con los registros de mediciones del cliente seleccionado, extrayendo los datos de la lista de tipo mediciones.
    public static void showMeasures(PrintWriter out) {
        String[] header = {"idMedicion", "Cliente", "FechaHora", "KW"};
        try {
            out.println("<table>");
            out.println("<thead>");
            out.println("<tr>");
            for (String field : header) {
                out.println("<th>");
                out.println(field);
                out.println("</th>");
            }
            out.println("</tr>");
            out.println("</thead>");
            out.println("<tbody>");
            for (Measures measure : measuresList) {
                out.println("<tr>");
                out.println("<td>");
                out.print(measure.getIdMeasure());
                out.println("</td>");
                out.println("<td>");
                out.print(measure.getClNo());
                out.println("</td>");
                out.println("<td>");
                out.print(measure.getDateTime());
                out.println("</td>");
                out.println("<td>");
                out.println("<form action=\"MedicionesConsumo\" method=\"GET\">");
                out.print("<button type=\"submit\" name=\"medida\" value=\"" + measure.getKw() + "\">Ver KW</button>");
                out.println("</form>");
                out.println("</td>");
                out.println("</tr>");
            }
            out.println("</tbody>");
            out.println("</table>");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
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
