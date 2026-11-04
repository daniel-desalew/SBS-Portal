import ExcelJS from 'exceljs';

export const exportRowsAsCsv = async (
  rows: Array<Record<string, string | number | boolean | null>>,
): Promise<string> => {
  if (rows.length === 0) return '';
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const quote = (value: unknown): string =>
    `"${String(value ?? '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`;
  return [
    columns.map(quote).join(','),
    ...rows.map((row) => columns.map((column) => quote(row[column])).join(',')),
  ].join('\r\n');
};

export const exportRowsAsXlsx = async (
  rows: Array<Record<string, string | number | boolean | null>>,
): Promise<Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Export');
  if (rows.length > 0) {
    sheet.columns = Object.keys(rows[0] ?? {}).map((key) => ({ header: key, key }));
    sheet.addRows(rows);
  }
  return Buffer.from(await workbook.xlsx.writeBuffer());
};