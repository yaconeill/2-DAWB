<%-- 
    Document   : welcome
    Created on : 07-nov-2017, 12:00:03
    Author     : Yaco
--%>

<%@page import="java.util.Calendar"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1><strong>BIENVENIDO </strong><a href="index.html"> Inicio</a></h1>
        Son las 
        <%
            Calendar time = Calendar.getInstance();
            out.print(time.get(Calendar.HOUR_OF_DAY) + ":" + time.get(Calendar.MINUTE) + " " + " horas del día " + time.get(Calendar.DAY_OF_MONTH)+ " del " + 
                    (time.get(Calendar.MONTH) + 1) + " de " + time.get(Calendar.YEAR));
        %>
    </body>
</html>
