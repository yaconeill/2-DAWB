<%-- 
    Document   : misclientesList
    Created on : 14-nov-2017, 11:48:54
    Author     : Yaco
--%>

<%@page import="java.util.Properties"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.net.URL"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.lang.*"%>
<%@page import="java.util.List"%>
<%@page import="es.cifpcm.consumoelectricojsp_aymediacoan.Process"%>
<%@page import="es.cifpcm.consumoelectricojsp_aymediacoan.Cliente"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<jsp:useBean id="BuscadorCliente" class="es.cifpcm.consumoelectricojsp_aymediacoan.Process" scope="request"/>--%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <%!static List<Cliente> clientList;%>
        <%
//            String name = request.getParameter("nameToSearch");
            Integer Registros = Integer.parseInt(request.getParameter("Registros"));
            Process.rowsInDB();
            clientList = Process.retrieveDataClient(Registros);
        %>
    </head>
    <body>
        <form action="misclientesList.jsp">
            <table>
                <%for (Cliente client : clientList) {%>
                <tr>
                    <td><%=client.getClNo()%></td>
                    <td><%=client.getFirstName()%></td>
                    <td><%=client.getLastName()%></td>
                    <td><%=client.getStreetName()%></td>
                    <td><%=client.getNumber()%></td>
                    <td><%=client.getPopulation()%></td>
                    <td><%=client.getProvince()%></td>
                </tr>
                <%}%>            
            </table>
            <div class="btn-group">
                <button class="btn btn-default btn-sm" role="button" name="btini" type="submit"><span
                        class="glyphicon glyphicon-step-backward"></span></button>
                <button class="btn btn-default btn-sm" role="button" name="btant" type="submit"><span
                        class="glyphicon glyphicon-backward"></span></button>
                <button class="btn btn-default btn-sm" role="button" name="btsig" id="btsig" type="submit"><span
                        class="glyphicon glyphicon-forward"></span></button>
                <button class="btn btn-default btn-sm" role="button" name="btult" type="submit"><span
                        class="glyphicon glyphicon-step-forward"></span></button>
            </div>
        </form> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
