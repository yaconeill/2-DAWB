<%-- 
    Document   : misclientesList
    Created on : 14-nov-2017, 11:48:54
    Author     : Yaco
--%>

<%@page import="es.cifpcm.consumoelectrico_Aymediacoan.buscador.web.BuscadorConsumoElectricoServlet"%>
<%@page import="java.util.ArrayList"%>
<%@page import="es.cifpcm.consumoelectrico_Aymediacoan.buscador.web.Cliente"%>
<%@page import="java.lang.*"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%><!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <%!static List<Cliente> clientList;%>
        <%!static Integer posi = 0;%>
        <%!%>
        <%
            String name = request.getParameter("nameToSearch");
            if (request.getParameter("nameToSearch") != null) {
                BuscadorConsumoElectricoServlet.setCookieText(request, response, "nombre", name);
            } else {
                name = BuscadorConsumoElectricoServlet.getCookie(request, "nombre").getValue();
            }
            Integer pageSize;
            if (request.getParameter("pageSize") != null) {
                pageSize = Integer.parseInt(request.getParameter("pageSize"));
                BuscadorConsumoElectricoServlet.setCookie(request, response, "pageSize");
            } else {
                pageSize = Integer.parseInt(BuscadorConsumoElectricoServlet.getCookie(request, "pageSize").getValue());
            }
            Integer finDb = BuscadorConsumoElectricoServlet.rowsInDB();

            String btini = request.getParameter("btini");
            String btant = request.getParameter("btant");
            String btsig = request.getParameter("btsig");
            String btult = request.getParameter("btult");
            if (btant != null) {
                posi -= pageSize;
                if (posi < 0) {
                    posi = 0;
                }
            }
            if (btsig != null) {
                posi += pageSize;
                if (posi > finDb) {
                    posi = finDb - pageSize;
                }
            }
            if (btini != null) {
                posi = 0;
            }
            if (btult != null) {
                posi = finDb - pageSize;
            }

            String[] header = {"id", "Nombre", "Apellido", "Calle", "Numero", "C.Postal", "Población", "Provincia"};
        %>
    </head>
    <body>
        <div class="text-center">
            <form action="misclientesList.jsp" id="form-group">
                <div class="jumbotron">
                    <div class="container">                        
                        <h2><%=name%></h2><hr>
                        <h3>Listado de clientes</h3>
                        <table  class="table table-hover">
                            <thead>
                                <tr  class="info">
                                    <%for (String field : header) {%>
                                    <th>
                                        <%=field%>
                                    </th>
                                    <%}%>
                                </tr>
                            </thead>
                            <tbody>
                                <%clientList = BuscadorConsumoElectricoServlet.retrieveDataClient(posi);
                                    for (Cliente client : clientList) {%>
                                <tr>
                                    <td><%=client.getClNo()%></td>
                                    <td><%=client.getFirstName()%></td>
                                    <td><%=client.getLastName()%></td>
                                    <td><%=client.getStreetName()%></td>
                                    <td><%=client.getNumber()%></td>                    
                                    <td><%=client.getPostalCode()%></td>
                                    <td><%=client.getPopulation()%></td>
                                    <td><%=client.getProvince()%></td>
                                </tr>
                                <%}%>
                            </tbody>
                        </table>
                        <div class="btn-group">
                            <button class="btn btn-default btn-sm" role="button" name="btini" type="submit" <%if (posi <= 0) {%>disabled<%}%>><span
                                    class="glyphicon glyphicon-step-backward"></span></button>
                            <button class="btn btn-default btn-sm" role="button" name="btant" type="submit" <%if (posi <= 0) {%>disabled<%}%>><span
                                    class="glyphicon glyphicon-backward"></span></button>
                            <button class="btn btn-default btn-sm" role="button" name="btsig" id="btsig" type="submit" <%if (posi >= finDb - pageSize) {%>disabled<%}%>><span
                                    class="glyphicon glyphicon-forward"></span></button>
                            <button class="btn btn-default btn-sm" role="button" name="btult" type="submit" <%if (posi >= finDb - pageSize) {%>disabled<%}%>><span
                                    class="glyphicon glyphicon-step-forward"></span></button>
                        </div>
                        <div class="btn">
                            <a href="index.html"><span class="glyphicon glyphicon-home"></span></a>
                        </div>
                    </div>
                </div>
            </form> 

        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
