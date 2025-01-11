export default function AlertBox( { message,done }: { message: string, done: boolean } ) {
    return (
        <>
            {!done && 
                <div className="alert-box">
                    <p>{message}</p>
                </div>
            }
        </>
    );
};
