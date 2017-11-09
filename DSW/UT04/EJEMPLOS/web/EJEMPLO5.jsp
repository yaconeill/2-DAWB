<%-- 
    Document   : EJEMPLO5
    Created on : 07-nov-2017, 11:54:49
    Author     : Yaco
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%@page import="java.util.Enumeration"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>JSP Page</title>
    </head>
    <body>
        <b>Http headers:</b><br/>
        <%-- primero --%>
        <%
            for (Enumeration<String> e = request.getHeaderNames();
                    e.hasMoreElements();) {
                String header = e.nextElement();
                out.println(header + ": " + request.getHeader(header) + "<br/>");
            }
            String message = "Eso eso todo";
        %>
        <hr/>
        <%-- segundo --%>
        <%out.println(message);%>
    </body>
</html>
