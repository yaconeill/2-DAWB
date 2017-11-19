<%-- 
    Document   : LoginSuccess
    Created on : 10-nov-2017, 12:02:07
    Author     : Yaco
--%>

<%--
Document : loginSuccess
Created on : 09-nov-2017, 22:40:39
Author : inmav
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="loginBean" class="es.cifpcm.aut04_03_aymediacoan.web.controller.model.Login" scope="request"/>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Bienvenido <jsp:getProperty name="loginBean" property="usuario"/></h1>
    </body>
</html>
