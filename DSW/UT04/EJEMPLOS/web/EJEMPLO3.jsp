<%-- 
    Document   : EJEMPLO3
    Created on : 07-nov-2017, 11:50:06
    Author     : Yaco
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%! int day = 3;%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>JSP Page</title>
    </head>
    <body>
        <% if (day == 1 | day == 7) {
                out.print("<p>Today is weekend</p>");
            } else {
                out.print("<p>Today is not weekend</p>");
            }%>
    </body>
</html>
