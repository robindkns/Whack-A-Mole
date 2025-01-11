import "../../styles/AlertBox.sass";

export default function AlertBox( { message }: { message: string } ) {
    return (
        <>
            {   
                <div>
                    <div className="alert-box">
                        <p>{message}</p>
                    </div>
                </div>
            }
        </>
    );
};
