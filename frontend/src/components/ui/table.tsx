export function Table({ children }: { children: React.ReactNode }) {
  return <div className="table-scroll"><table className="data-table">{children}</table></div>;
}

export const TableHead = ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>;
export const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;
export const TableRow = ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>;
export const TableCell = ({ children }: { children: React.ReactNode }) => <td>{children}</td>;
export const TableHeaderCell = ({ children }: { children: React.ReactNode }) => <th>{children}</th>;