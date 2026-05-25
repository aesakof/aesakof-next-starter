import * as React from "react";

type TableProps = React.HTMLAttributes<HTMLTableElement>;

const Table = ({ className, children, ...props }: TableProps) => (
    <div className="relative w-full overflow-x-auto">
        <table
            className={`w-full caption-bottom text-sm ${className ?? ""}`}
            {...props}
        >
            {children}
        </table>
    </div>
);

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

const TableHeader = ({ className, children, ...props }: TableHeaderProps) => (
    <thead
        className={`border-b border-border ${className ?? ""}`}
        {...props}
    >
        {children}
    </thead>
);

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const TableBody = ({ className, children, ...props }: TableBodyProps) => (
    <tbody
        className={`divide-y divide-border ${className ?? ""}`}
        {...props}
    >
        {children}
    </tbody>
);

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const TableRow = ({ className, children, ...props }: TableRowProps) => (
    <tr
        className={`transition-colors hover:bg-surface ${className ?? ""}`}
        {...props}
    >
        {children}
    </tr>
);

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHead = ({ className, children, ...props }: TableHeadProps) => (
    <th
        className={`h-10 px-4 text-left align-middle text-sm font-medium text-text-secondary ${className ?? ""}`}
        {...props}
    >
        {children}
    </th>
);

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = ({ className, children, ...props }: TableCellProps) => (
    <td
        className={`px-4 py-3 align-middle text-text-primary ${className ?? ""}`}
        {...props}
    >
        {children}
    </td>
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };