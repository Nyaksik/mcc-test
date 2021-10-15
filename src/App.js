import { useState } from 'react';

import './App.css';

function App() {
    const [mainNode, setMainNode] = useState([])
    const [choice, setChoice] = useState({do: '', node: 'MAIN'})
    const [input, setInput] = useState('')
    const [click, setClick] = useState()

    const clickUser = () => {
        switch (choice.do) {
            case 'ADD':
                choice.node === 'MAIN'
                ?
                setMainNode([...mainNode, {id: Math.floor(Math.random() * 10000), name: input, children: []}])
                :
                setMainNode(mainNode.map((it) => {
                    if (it.id === click) {
                        return {...it, children: [...it.children, {id: Math.floor(Math.random() * 10000), name: input, children: []}]}
                    }
                    return it
                }))
                setInput('')
                break
            case 'REMOVE':
                setMainNode(mainNode.filter((it) => it.id !== click))
                break
            case 'EDIT':
                setMainNode(mainNode.map((it) => it.id === click ? {...it, name: input} : it))
                break
            case "RESET":
                setMainNode([])
                setChoice({...choice, do: ''})
                break
            default:
                setMainNode(mainNode)
                break
        }
    }
    console.log(click)

    return (
        <div>
            <div className="App">
                <div className='main'>
                    <div className='node-block main__node-block'>
                        <div onClick={() => setChoice({...choice, node: 'MAIN'})}>Main:</div>
                        {mainNode.map((it) => <div
                        className='node node-block__node'
                        key={Math.random()}
                        onClick={() =>
                        {   
                            setClick(it.id)
                            setChoice({...choice, node: it.name})
                        }
                        }
                        >
                            {it.name}
                            {it.children.map((it) => <div
                            className='node node-block__node'
                            key={Math.random()}
                            onClick={() =>
                            {   
                                setClick(it.id)
                                setChoice({...choice, node: it.name})
                            }
                            }
                            >
                                {it.name}
                            </div>)}
                        </div>)}
                    </div>
                </div>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => {
                        setChoice({...choice, do: e.target.value})
                    }
                    }
                    value='ADD'
                >
                    Add
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => {
                        setChoice({...choice, do: e.target.value})
                    }
                    }
                    value='REMOVE'
                >
                    Remove
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => {
                        setChoice({...choice, do: e.target.value})
                    }
                    }
                    value='EDIT'
                >
                    Edit
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => {
                        setChoice({...choice, do: e.target.value})
                    }
                    }
                    value='RESET'
                >
                    Reset
                </button>
            </div>
                <div className='App__input'>
                    {(!!choice.do && !!choice.node)
                    ?
                    <div>
                        <div>Action: {choice.do} Node: {choice.node}</div>
                        <input onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter the node name' />
                        <button className='btn' type='button' onClick={clickUser}>Apply</button>
                    </div>
                    :
                    <p>Select a branch and action</p>
                    }
                </div>
        </div>
    );
}

export default App;
