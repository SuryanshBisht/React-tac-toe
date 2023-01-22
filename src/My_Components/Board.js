import{ React,useEffect,useState} from 'react'
import './Board.css'

export const Board = () => {
    const [states, setState] = useState(Array(9).fill(" "));
    const [cross, setCross] = useState(1);
    const [clicked, setClicked] = useState(Array(9).fill(0));
    const [winner, setWinner] = useState(" ");
    const [over, setOver] = useState(0);

    function reset(){
        setState(Array(9).fill(" "));
        setCross(1);
        setClicked(Array(9).fill(0));
        setWinner(" ");
    }

    function updateClicked(index){
        const newClicks = clicked.map(
            (state, i) => {
                if(i === index) {
                    state = 1;
                }
                return state;
            }
        )
        setClicked(newClicks);
    }

    function calculateWinner(){
        const winningConfig = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i = 0; i < winningConfig.length; i++){
            let c1 = winningConfig[i][0];
            let c2 = winningConfig[i][1];
            let c3 = winningConfig[i][2];
            if(states[c1] !== " " && states[c1] === states[c2] && states[c2] === states[c3]){
                setWinner(states[c1]);
            }
        }  
        for(let i = 0; i < states.length ; i++){
            if(states[i] === " "){
                setOver(0);
                return;
            }
        }
        setOver(1);
    }

    function updateStates(index){
        if(clicked[index] || winner !== " ") index = -1;
        const newStates = states.map(
            (state, i) => {
                if(i === index) {
                    let res = (cross === 1) ? "X" : "O";
                    setCross(1 - cross);
                    return res;
                }
                return state;
            }
        );
        setState(newStates);
        updateClicked(index);
    }

    useEffect(
        () => {
            calculateWinner();
            // console.log(states);
            // console.log(clicked);
            // console.log(winner);
        }
    )

    return (
        <>
        <div className="board ">
        {
            states.map(
                (data, i) => (
                    <button className = {`cell ${"box" + i} scale-in-center`} key = {i} onClick = {() => updateStates(i)}>
                    {data}
                    </button>
                )
            )
        }
        </div>
        <div >
        {
            (winner === "X" || winner === "O") ?
                (
                `Congratulations ${winner}`
                ):
                (over === 1) ?
                (
                    "Tie"   
                ): " "
            }
        </div>
        <button className = "reset" onClick = {() => reset()}>Reset</button>
        </>
    )
}
