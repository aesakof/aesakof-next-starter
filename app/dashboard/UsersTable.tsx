import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table'

type User = {
    id: string
    name: string | null
    email: string
    username: string | null
    createdAt: Date
}

type UsersTableProps = {
    users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>User Since</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map( (user) => 
                    <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    )
}