const ExcelJS = require("exceljs");
const { test } = require("@playwright/test");

async function writeExcel(searchText, replaceText, change, filepath) {

    const WB = new ExcelJS.Workbook();
    await WB.xlsx.readFile(filepath);
    const WS = WB.getWorksheet('Sheet1');
    const output = await readExcel(WS, searchText);
    const cell = WS.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await WB.xlsx.writeFile(filepath);
}

async function readExcel(WS, searchText) {
    let output = { row: -1, column: -1 };
    WS.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}
//writeExcel("Kivi", "500", { rowChange: 0, colChange: 2 }, "C:\\Users\\HP\\Downloads\\download.xlsx");

test.only('Excel_Upload_Download', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;
    const downFilePath = "C:\\Users\\HP\\Downloads\\downloadexcel.xlsx";
    await download.saveAs(downFilePath);
    writeExcel("Kivi", "500", { rowChange: 0, colChange: 2 }, "C:\\Users\\HP\\Downloads\\downloadexcel.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\HP\\Downloads\\downloadexcel.xlsx");
    await page.pause();

    //C:\\Users\\HP\\Downloads\\download.xlsx
})