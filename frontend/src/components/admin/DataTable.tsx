import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../ui/table';

export function DataTable({
  columns,
  rows,
  rowHref,
}: {
  columns: string[];
  rows: Array<Record<string, unknown>>;
  rowHref?: (row: Record<string, unknown>) => string | undefined;
}) {
  return (
    <Table>
      <TableHead><TableRow>{columns.map((column) => <TableHeaderCell key={column}>{column}</TableHeaderCell>)}</TableRow></TableHead>
      <TableBody>{rows.map((row, index) => (
        <TableRow key={String(row._id ?? index)}>
          {columns.map((column, columnIndex) => {
            const href = columnIndex === 0 ? rowHref?.(row) : undefined;
            return (
              <TableCell key={column}>
                {href ? <Link href={href}>{String(row[column] ?? '—')}</Link> : String(row[column] ?? '—')}
              </TableCell>
            );
          })}
        </TableRow>
      ))}</TableBody>
    </Table>
  );
}