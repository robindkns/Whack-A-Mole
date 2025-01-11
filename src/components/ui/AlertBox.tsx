export default function AlertBox( { message }: { message: string }) {
    return (
        <div className="alert-box">
            <p>{message}</p>
        </div>
    );
};
