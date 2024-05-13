//String Modifier

export function truncateString(str: string) {
   
    let words = str.split(" ");
    let truncatedWords = words.slice(0, 20);
    let truncatedString = truncatedWords.join(" ");
    if (words.length > 20) {
        truncatedString += " ...";
    }
    return truncatedString;
}