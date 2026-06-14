"use client"

import { useState } from "react"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Modal from "@/components/ui/Modal"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"

export default function UISamples() {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <section className="mb-12">
                <h2 className="text-xs font-medium tracking-widest uppercase text-text-secondary mb-5 pb-2 border-b border-border">Buttons</h2>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Button variant="primary" size="sm">CLICK ME</Button>
                    <Button variant="primary" size="md">CLICK ME</Button>
                    <Button variant="primary" size="lg">CLICK ME</Button>
                    <Button variant="primary" size="xl">CLICK ME</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Button variant="secondary" size="sm">CLICK ME</Button>
                    <Button variant="secondary" size="md">CLICK ME</Button>
                    <Button variant="secondary" size="lg">CLICK ME</Button>
                    <Button variant="secondary" size="xl">CLICK ME</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Button variant="danger" size="sm">CLICK ME</Button>
                    <Button variant="danger" size="md">CLICK ME</Button>
                    <Button variant="danger" size="lg">CLICK ME</Button>
                    <Button variant="danger" size="xl">CLICK ME</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Button variant="primary" size="md" disabled>DISABLED</Button>
                    <Button variant="secondary" size="md" disabled>DISABLED</Button>
                    <Button variant="danger" size="md" disabled>DISABLED</Button>
                </div>
                <div className="mt-2">
                    <Button fullWidth>FULL WIDTH</Button>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xs font-medium tracking-widest uppercase text-text-secondary mb-5 pb-2 border-b border-border">Cards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Card title="Title only" />
                    <Card
                        title="Title and description"
                        description="A supporting description beneath the title."
                    />
                    <Card
                        title="With content"
                        description="This card has a body and a footer."
                        footer={<Button size="sm">Save</Button>}
                    >
                        <p className="text-sm text-text-secondary">Some content goes here inside the card body.</p>
                    </Card>
                    <Card
                        danger
                        title="Danger card"
                        description="Used for destructive actions like deleting an account."
                        footer={<Button variant="danger" size="sm">Delete account</Button>}
                    />
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xs font-medium tracking-widest uppercase text-text-secondary mb-5 pb-2 border-b border-border">Modal</h2>
                <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Sample modal">
                    <p className="text-sm text-text-secondary mb-4">This is a sample modal. It can contain any content you like.</p>
                    <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Close modal</Button>
                </Modal>
            </section>

            <section>
                <h2 className="text-xs font-medium tracking-widest uppercase text-text-secondary mb-5 pb-2 border-b border-border">Table</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Alex Johnson</TableCell>
                            <TableCell>alex@example.com</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>Jan 2024</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Maria Chen</TableCell>
                            <TableCell>maria@example.com</TableCell>
                            <TableCell>Editor</TableCell>
                            <TableCell>Mar 2024</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sam Patel</TableCell>
                            <TableCell>sam@example.com</TableCell>
                            <TableCell>Viewer</TableCell>
                            <TableCell>Jun 2024</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Jordan Lee</TableCell>
                            <TableCell>jordan@example.com</TableCell>
                            <TableCell>Editor</TableCell>
                            <TableCell>Aug 2024</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </div>
    )
}