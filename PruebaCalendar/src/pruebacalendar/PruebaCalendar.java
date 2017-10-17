/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pruebacalendar;

import java.text.DateFormatSymbols;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 *
 * @author Yaco
 */
public class PruebaCalendar {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String nMonth = "octubre";
        int m;
        switch (nMonth.toLowerCase()) {
            case "enero":
                m = 1;
                break;
            case "febrero":
                m = 2;
                break;
            case "marzo":
                m = 3;
                break;
            case "abril":
                m = 4;
                break;
            case "mayo":
                m = 5;
                break;
            case "junio":
                m = 6;
                break;
            case "julio":
                m = 7;
                break;
            case "agosto":
                m = 8;
                break;
            case "septiembre":
                m = 9;
                break;
            case "octubre":
                m = 10;
                break;
            case "noviembre":
                m = 11;
                break;
            case "diciembre":
                m = 12;
                break;
            default:
                m = 8;
        }
        Calendar calendar = new GregorianCalendar(2017, m, 1);
        DateFormatSymbols dfs = new DateFormatSymbols();
        Date time = new Date("2017/" + m + "/01");
        calendar.setTime(time);
        //String[] dow = {"", "D", "L", "M", "X", "J", "V", "S"};
        String[] daysOfWeek = {"L", "M", "X", "J", "V", "S", "D"};
        calendar.setFirstDayOfWeek(0);
        //dfs.setShortWeekdays(dow);
        //String[] daysOfWeek = dfs.getShortWeekdays();
//        for (int i = 0; i < daysOfWeek.length; i++) {
//            
//        }
        int currentMonth = calendar.get(Calendar.MONTH);
        int currDayOfWeekValue = calendar.get(Calendar.DAY_OF_WEEK) - 1;

        String nameMonth = dfs.getMonths()[calendar.get(Calendar.MONTH)];
        System.out.println(nameMonth);
        System.out.println(daysOfWeek[calendar.getFirstDayOfWeek()]);
        System.out.println(calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

        while (calendar.get(Calendar.MONTH) == currentMonth) {
            while (currDayOfWeekValue < daysOfWeek.length - 1
                    && calendar.get(Calendar.MONTH) == currentMonth) {
                String day = Integer.toString(
                        calendar.get(Calendar.DAY_OF_MONTH));
            }
        }
//        for (String s : daysOfWeek) {
//            System.out.println(s);
//        }
    }

}
