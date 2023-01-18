export function getFormattedDate(date) {
   // return `${date.getDate().toString().padStart(2, "0")}-${date
   //    .getMonth()
   //    .toString()
   //    .padStart(2, "0")}-${date.getFullYear()}`;

   // return `${date.toLocaleDateString("en-US")}`;

   return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}
