import { StatusMap } from "./Constants";
import { Application } from "./Types";

export const convertDate = (date : string) => {
    const inputDate = new Date(date);
    const day = inputDate.getDate();      
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear(); 
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate;
}