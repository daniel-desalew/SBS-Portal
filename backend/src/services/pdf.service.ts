import PDFDocument from 'pdfkit';

export const createPdfBuffer = async (title: string, lines: string[]): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const document = new PDFDocument({ size: 'A4', margin: 48 });
    const chunks: Buffer[] = [];
    document.on('data', (chunk: Buffer) => chunks.push(chunk));
    document.on('error', reject);
    document.on('end', () => resolve(Buffer.concat(chunks)));
    document.fontSize(20).text(title, { continued: false });
    document.moveDown();
    document.fontSize(11);
    for (const line of lines) document.text(line);
    document.end();
  });