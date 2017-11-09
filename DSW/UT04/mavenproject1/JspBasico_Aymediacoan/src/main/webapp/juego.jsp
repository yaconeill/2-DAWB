<%-- 
    Document   : index_juego
    Created on : 07-nov-2017, 14:35:17
    Author     : Yaco
--%>

<%@page import="java.util.Random"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="container">
            <%
                int sum = 0;
                String text;
                int apuesta = Integer.parseInt(request.getParameter("apuesta"));
                int cantidad = Integer.parseInt(request.getParameter("cantidad"));

                Random rnd = new Random();
                int num = rnd.nextInt(2);
                if (apuesta == num) {
                    sum = cantidad * 2;
                    text = "HAS GANADO " + sum + " €";%>
                    <h1><strong><%=text%> </strong><a href="index_juego.html">Volver</a></h1>
            <img src='img/winner.jpg'>

            <%} else {
            text = "HAS PERDIDO";%>            
            <h1><strong><%=text%> </strong><a href="index_juego.html"> Volver</a></h1>
            <img src='img/loser2.jpg'>
            <%}%>
        </div>
    </body>
</html>
