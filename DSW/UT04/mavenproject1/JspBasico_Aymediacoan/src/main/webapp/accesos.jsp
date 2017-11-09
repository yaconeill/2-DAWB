<%-- 
    Document   : accesos
    Created on : 07-nov-2017, 14:59:41
    Author     : Yaco
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%! int count = 1;%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <p><a href="index.html"> Inicio</a></p>
        <% String text = "";
            if (count == 10) {
                text = "Felicidades has llegado a " + count + " visitas";
            }
        %>

        <h1><%=count%> <% if (count
                    == 1) {
                out.print("visita");
            } else {
                out.print(" visitas");
            }%></h1>
            <h2><%=text%></h2>
            <%count++;%>
    </body>
</html>
