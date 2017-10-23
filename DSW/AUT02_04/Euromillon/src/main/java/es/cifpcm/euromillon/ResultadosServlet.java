/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.euromillon;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;
import java.util.TreeSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Yaco
 */
public class ResultadosServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    private static final TreeSet<Integer> COMBINACION_GANADORA = new TreeSet();
    private static TreeSet<Integer> COMBINACION_ELEGIDA = new TreeSet();
    private static Integer ACIERTOS = 0;
    private static boolean ERROR = false;
    private static String textoError = "";

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        response.setContentType("text/html;charset=UTF-8");
//        try (PrintWriter out = response.getWriter()) {
//            /* TODO output your page here. You may use following sample code. */
//            out.println("<!DOCTYPE html>");
//            out.println("<html>");
//            out.println("<head>");
//            out.println("<title>Servlet ResultadosServlet</title>");            
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet ResultadosServlet at " + request.getContextPath() + "</h1>");
//            out.println("<h1>Has acertado</h1> " + ACIERTOS + " de " + COMBINACION_GANADORA.size());
//            out.println("</body>");
//            out.println("</html>");
//        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String[] szNumeros = request.getParameterValues("numero");
        String textoGanador = "";
        init();
        procesoSorteo(szNumeros);
        if (ACIERTOS == 6) {
            textoGanador = "BRAVO!! Has resultado ganador.";
        }
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ResultadosServlet</title>");
            out.println("</head>");
            out.println("<body>");
            if (!ERROR) {
                out.println("<h1>Has acertado " + ACIERTOS + " de " + COMBINACION_GANADORA.size() + "</h1>");
                out.println("<h2>Combinación ganadora: " + COMBINACION_GANADORA + "</h2>");
                out.println("<p>Tus números: " + COMBINACION_ELEGIDA + "</p>");
                out.println("<h1><span>" + textoGanador + "</span></h1>");
            } else {
                out.println("<h1>Se ha producido un error, por favor revisa lo datos introducidos.</h1>");
                out.println("<h2>" + textoError + "</h2>");
            }
            out.println("</body>");
            out.println("</html>");
        }
        resetValues();
    }

    public static void procesoSorteo(String[] szNumeros) {
        for (String num : szNumeros) {
            if (isInteger(num)) {
                if (Integer.parseInt(num) > 0 && Integer.parseInt(num) <= 45) {
                    COMBINACION_ELEGIDA.add(Integer.parseInt(num));
                    if (COMBINACION_ELEGIDA.size() == 6 && !ERROR) {
                        for (Object elmt : COMBINACION_ELEGIDA) {
                            boolean a = COMBINACION_GANADORA.contains(elmt);
                            if (a) {
                                ACIERTOS++;
                            }
                        }
                    } else {
                        ERROR = true;
                        textoError = "No se permiten valores repetidos.";
                        break;
                    }
                } else {
                    ERROR = true;
                    textoError = "Algún valor está fuera de rango, sólo se permiten números enteros entre 1 y 45";
                    break;
                }
            } else {
                ERROR = true;
                textoError = "Alguno de los campos contiene un valor no numérico.";
                break;
            }
        }
    }

    public static void resetValues() {
        COMBINACION_GANADORA.clear();
        COMBINACION_ELEGIDA.clear();
        ACIERTOS = 0;
        ERROR = false;
        textoError = "";
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @Override
    public void init() throws ServletException {
        super.init();
        Random rnd = new Random();
        while (COMBINACION_GANADORA.size() < 6) {
            int num = rnd.nextInt(45) + 1;
            if (!COMBINACION_GANADORA.contains(num)) {
                COMBINACION_GANADORA.add(num);
            }
        }
    }

    public static boolean isInteger(String input) {
        try {
            Integer.parseInt(input);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
