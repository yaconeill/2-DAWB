/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clientesconsumos;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Yaco
 */
public class ClientesConsumos {

    /**
     * @param args the command line arguments
     */
    static List<Cliente> clientList;
    static List<Measures> measuresList;
//    static List<Cliente> temp;

    public static void main(String[] args) {
//        retieveDataClient();

//        1. En primer lugar sacaremos por consola un listado de clientes con todos sus datos.
//        showClients(1);
//        2. Repetimos el ejercicio insertando una línea horizontal cada diez registros.
//        showClients(2);
//        3. Esta vez sacaremos por consola solamente la identificación del cliente (nuestro código
//          id) y la calle y número donde vive.
//        showAddress();
//        4. Seguidamente sacaremos un listado con las mediciones en Kw de todos los clientes y el
//          consumo total desde la primera medición hasta la última.
//        retieveDataMeasure();
//        showMeasures();
//        5. Repetimos pero esta vez solo mostramos los registros de mediciones para aquellos
//          clientes que vivan en el código postal 15402
//        searchByPostCode();
//        showMeasures();
//        6. Sacaremos por pantalla los datos personales y de mediciones de una persona
//          introducida por consola.
        crossReference();
    }

    public static void retieveDataClient() {
        Connection conexion = null;
        clientList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from misclientes");
            // Se recorre el ResultSet, mostrando por pantalla los resultados.

            while (rs.next()) {
                Cliente newClient = new Cliente(rs.getInt("id"), rs.getString(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8));
                clientList.add(newClient);
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }

        }
    }

    public static void retieveDataMeasure() {
        Connection conexion = null;
        measuresList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2dawa y contraseña 2dawa
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from mediciones");
            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                Measures newMeasure = new Measures(rs.getInt(1), rs.getInt(2), rs.getDate(3), rs.getDouble(4));
                measuresList.add(newMeasure);
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }

        }
    }

    public static void showClients(int option) {
        int c = 0;
        try {
            for (Cliente client : clientList) {
                StringBuilder out = new StringBuilder();
                out.append(client.getClNo()).append(" ");
                out.append(client.getFirstName()).append(" ");
                out.append(client.getLastName()).append(" ");
                out.append(client.getStreetName()).append(" ");
                out.append(client.getNumber()).append(" ");
                out.append(client.getPostalCode()).append(" ");
                out.append(client.getPopulation()).append(" ");
                out.append(client.getProvince()).append(" ");
                if (option == 1) {
                    System.out.println(out);
                }
                if (option == 2) {
                    System.out.println(out);
                    c++;
                    if (c == 10) {
                        System.out.println("------------------------------------------------------------------");
                        c = 0;
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void showAddress() {
        try {
            for (Cliente client : clientList) {
                StringBuilder out = new StringBuilder();
                out.append(client.getClNo()).append(" ");
                out.append(client.getStreetName()).append(" ");
                out.append(client.getNumber()).append(" ");

                System.out.println(out);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void showMeasures() {
        try {
            for (Measures measure : measuresList) {
                StringBuilder out = new StringBuilder();
                out.append(measure.getIdMeasure()).append(" ");
                out.append(measure.getClNo()).append(" ");
                out.append(measure.getDateTime()).append(" ");
                out.append(measure.getKw()).append(" ");
                System.out.println(out);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void searchByPostCode() {
        Connection conexion = null;
        measuresList = new ArrayList<>();
        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select idMedicion, Cliente, FechaHora, KW from misclientes as cl "
                    + "join mediciones as me "
                    + "on cl.id = me.Cliente "
                    + "where CodPostal = 15402");
            // Se recorre el ResultSet, mostrando por pantalla los resultados.

            while (rs.next()) {
                Measures newMeasure = new Measures(rs.getInt(1), rs.getInt(2), rs.getDate(3), rs.getDouble(4));
                measuresList.add(newMeasure);
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }

        }
    }

    public static void crossReference() {
        Connection conexion = null;
        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from misclientes as cl "
                    + "join mediciones as me "
                    + "on cl.id = me.Cliente "
                    + "group by id");
            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            //System.out.println("id  Nombre  Apellido    Calle   Num CodPostal   Población   Provincia   idMedición  Fecha   KW");
            while (rs.next()) {
                StringBuilder out = new StringBuilder();
                out.append(rs.getInt("id")).append(" ");
                out.append(rs.getString("nombre")).append(" ");
                out.append(rs.getString("apellido")).append(" ");
                out.append(rs.getString("NombreCalle")).append(" ");
                out.append(rs.getString("Numero")).append(" ");
                out.append(rs.getInt("CodPostal")).append(" ");
                out.append(rs.getString("Poblacion")).append(" ");
                out.append(rs.getString("Provincia")).append(" ");
                out.append(rs.getInt("idMedicion")).append(" ");
                out.append(rs.getTimestamp("FechaHora")).append(" ");
                out.append(rs.getDouble("KW")).append(" ");
                System.out.println(out);
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }

        }
    }
}
