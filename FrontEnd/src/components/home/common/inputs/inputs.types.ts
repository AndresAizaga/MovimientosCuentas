export interface CustomProps {
    name: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
}