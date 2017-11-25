<%-- 
    Document   : newMovie
    Created on : 20-nov-2017, 12:33:09
    Author     : Yaco
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Nueva película</h1>
        <form action="MovieController">
            <fieldset>
                <legend>Datos película</legend>
                <label for="title">
                    <span>Título</span>
                    <input type="text" id="titulo" name="title">
                </label>
                <label for="category">
                    <span>Categoría</span>
                    <select name="category" id="category">
                        <option value="1">Comedia</option>
                        <option value="2">Drama</option>
                        <option value="3">Terror</option>
                        <option value="4">Ciencia Ficción</option>
                    </select>
                </label>
            </fieldset>
            <input type="submit" value="Enviar">
        </form>
    </body>
</html>
