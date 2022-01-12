import { PieceMovement } from "../chess/engine/PieceMovement";

export const safeObjectAssessor = (...args) => {
    let base = args[0];

    for (let i = 1; i < args.length; i++) {
        if (!base) return false;
        base = base[args[i]];
    }

    return true;

}
export const csvGenerator = (data: PieceMovement[]) => {

    let csvContent = "data:text/csv;charset=utf-8,";

    data.forEach(function (obj: PieceMovement) {
        let row = obj.toCSV().join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
}
