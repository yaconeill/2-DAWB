<%-- 
    Document   : EJEMPLO4
    Created on : 07-nov-2017, 11:54:11
    Author     : Yaco
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%! int day2 = 2; %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            switch (day2) {
                case 0:
                    out.println("It\'s Sunday.");
                    break;
                case 1:
                    out.println("It\'s Monday.");
                    break;
                case 2:
                    out.println("It\'s Tuesday.");
                    break;
                case 3:
                    out.println("It\'s Wednesday.");
                    break;
                case 4:
                    out.println("It\'s Thursday.");
                    break;
                case 5:
                    out.println("It\'s Friday.");
                    break;
                default:
                    out.println("It's Saturday.");
            }
        %>
    </body>
</html>
