import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function UISamples() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 font-(family-name:--font-geist-sans)">BUTTONS</h1>
            <div className="flex flex-col">
                <div className="m-4">
                    <Button variant="primary" size="sm">CLICK ME</Button>
                    <Button variant="primary" size="md">CLICK ME</Button>
                    <Button variant="primary" size="lg">CLICK ME</Button>
                    <Button variant="primary" size="xl">CLICK ME</Button>
                </div>
                <div className="m-4">
                    <Button variant="secondary" size="sm">CLICK ME</Button>
                    <Button variant="secondary" size="md">CLICK ME</Button>
                    <Button variant="secondary" size="lg">CLICK ME</Button>
                    <Button variant="secondary" size="xl">CLICK ME</Button>
                </div>
                <div className="m-4">
                    <Button variant="danger" size="sm">CLICK ME</Button>
                    <Button variant="danger" size="md">CLICK ME</Button>
                    <Button variant="danger" size="lg">CLICK ME</Button>
                    <Button variant="danger" size="xl">CLICK ME</Button>
                </div>
                <div className="m-4">
                    <Button fullWidth={true}>CLICK ME</Button>
                    <Button disabled={true} variant="primary" size="md">CLICK ME</Button>
                    <Button disabled={true} variant="secondary" size="md">CLICK ME</Button>
                    <Button disabled={true} variant="danger" size="md">CLICK ME</Button>
                </div>
                <div className="m-4">
                    <Card />
                </div>
            </div>
        </div>
    )
}