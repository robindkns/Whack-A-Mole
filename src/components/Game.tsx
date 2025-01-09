import '../styles/Game.sass'

export default function Game() {

    

    return(
        <>
            <div className='game'>
                <div className="board">
                    {Array.from({length: 12}, (_, i) => <div key={i} className="hole" style={{backgroundColor : 'red'}}></div>)}
                </div>
            </div>
        </>
    )
};
