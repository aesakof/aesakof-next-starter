import Button from "@/components/ui/Button";

export default function UISamples() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 font-(family-name:--font-geist-sans)">BUTTONS</h1>
            <div className="flex flex-col">
                <div>
                    <Button variant="primary" size="sm">CLICK ME</Button>
                    <Button variant="primary" size="md">CLICK ME</Button>
                    <Button variant="primary" size="lg">CLICK ME</Button>
                    <Button variant="primary" size="xl">CLICK ME</Button>
                </div>
                <div>
                    <Button variant="secondary" size="sm">CLICK ME</Button>
                    <Button variant="secondary" size="md">CLICK ME</Button>
                    <Button variant="secondary" size="lg">CLICK ME</Button>
                    <Button variant="secondary" size="xl">CLICK ME</Button>
                </div>
                <div>
                    <Button variant="danger" size="sm">CLICK ME</Button>
                    <Button variant="danger" size="md">CLICK ME</Button>
                    <Button variant="danger" size="lg">CLICK ME</Button>
                    <Button variant="danger" size="xl">CLICK ME</Button>
                </div>
            </div>
        </div>
    )
}