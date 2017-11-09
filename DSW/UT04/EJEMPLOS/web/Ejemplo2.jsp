<%-- 
    Document   : Ejemplo2
    Created on : 07-nov-2017, 11:41:34
    Author     : Yaco
--%>

<%@page language="java" contentType="text/html" pageEncoding="ISO-8859-1"%>
<%! int count = 0;%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>JSP Page</title>
    </head>
    <body>
         Ha entrado
        <%= count++%>
        <% if (count == 1) {
                out.print("vez");
            } else {
                out.print("veces");
            }%>
    </body>
</html>
