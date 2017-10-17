package exercises;

import java.text.DateFormatSymbols;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;

public class PrintMonth_Demo {

	public static void Run() {
		
		Calendar date = Calendar.getInstance();
		date.setTime(new Date("2016/11/01"));
		
		String space = " ";
		DateFormatSymbols dfs = new DateFormatSymbols();
		String[] daysOfWeek = dfs.getShortWeekdays();
		for ( int i = 0; i < daysOfWeek.length; i++ ) {
			
			daysOfWeek[ i ] = daysOfWeek[ i ] + space + space;
		}
		
		String monthName = 
				dfs.getMonths()[ date.get( Calendar.MONTH )];
		String yearMonthStr = 
				String.format("%s - %s", 
						date.get(Calendar.YEAR), monthName);
		
		int cellLength = daysOfWeek[1].length();
		int lineLength = cellLength * daysOfWeek.length;
		int padding = lineLength / 2 + 1 - yearMonthStr.length() / 2;
		
		System.out.println(yearMonthStr);
		System.out.println(String.join("", daysOfWeek));
		
		int currDayOfWeekValue = date.get(Calendar.DAY_OF_WEEK) - 1;
		int currentMonth = date.get(Calendar.MONTH);
		
		String prevPadding = 
				padLeft( "", currDayOfWeekValue * cellLength, ' ');
		
		while ( date.get(Calendar.MONTH) == currentMonth ) {
			
			while(
					currDayOfWeekValue < daysOfWeek.length - 1 &&
					date.get(Calendar.MONTH) == currentMonth
					)
			{
				
				String day = Integer.toString(
						date.get(Calendar.DAY_OF_MONTH));
				
				String cell = String.format(
						"%s%s%s%s",
						prevPadding,
						space,
						padLeft(day, 3, ' '),
						space);
				prevPadding = "";
				
				System.out.print(cell);
				
				date.add(Calendar.DAY_OF_MONTH, 1);
				currDayOfWeekValue++;
			} // end inner while
			
			currDayOfWeekValue = 0;
			
			System.out.println();
		} // end outer while
	}
	
	public static String padLeft (
			String self, int totalWidth, char paddingChar ) {
		
		if ( totalWidth <= 0 ) 
			return self;
		
		StringBuilder sb = new StringBuilder( self );
		
		while ( sb.length() < totalWidth ) {
			
			sb.insert( 0, paddingChar );
		}
		
		return sb.toString();
	}	
}










