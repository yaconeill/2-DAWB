<%-- 
    Document   : cecatalog
    Created on : 09-nov-2017, 8:30:09
    Author     : Yaco
--%>

<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8" import="java.net.*, java.io.*,java.util.Properties"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="css/style.css"/>
        <%!
            static private String dbUrl;
            static private String dbUser;
            static private String dbPassword;
            static private Integer dbPageSize;
            private final Integer DEFAULT_PAGESIZE = 10;
            static private String driverClassName;
        %>
        <%
            URL url = application.getResource("/WEB-INF/consumoelectrico.properties");
            InputStream in = url.openStream();
            Properties p = new Properties();
            p.load(in);
            Integer DEFAULT_PAGESIZE = 10;
            dbUrl = p.getProperty("database.url");
            dbUser = p.getProperty("database.user");
            dbPassword = p.getProperty("database.password");
            dbPageSize = p.getProperty("database.pageSize") == null ? DEFAULT_PAGESIZE : Integer.parseInt(p.getProperty("database.pageSize"));
            driverClassName = p.getProperty("database.driver");
            String name = request.getParameter("nameToSearch");
        %>
    </head>
    <body>
        <h1>Cliente a buscar: <%=name%></h1>
        <%            Connection conn = null;
            PreparedStatement stmt = null;
            try {

                Class.forName(driverClassName);

                conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);

                String sql = "SELECT * FROM misclientes LIMIT 0," + dbPageSize;
                stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery(sql);%>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Población</th>
                    <th>Provincia</th>
                </tr> 
            </thead>
            <tbody>
                <%while (rs.next()) {
                        String nombre = rs.getString("nombre");
                        String apellido = rs.getString("apellido");
                        String poblacion = rs.getString("Poblacion");
                        String provincia = rs.getString("Provincia");%>
                <tr>
                    <td><%=nombre%> <%=apellido%></td>
                    <td> <%=poblacion%></td>
                    <td><%=provincia%></td>
                </tr>
                <%}%>
            </tbody>
        </table>
        <% rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException se) {

                se.printStackTrace();
            } catch (Exception e) {

                e.printStackTrace();
            } finally {

                try {
                    if (stmt != null) {
                        stmt.close();
                    }
                } catch (SQLException se2) {
                }
                try {
                    if (conn != null) {
                        conn.close();
                    }
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
        %>
    </body>
</html>
