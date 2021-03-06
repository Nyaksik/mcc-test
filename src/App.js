import { useState } from 'react';
import NodeRoot from './NodeRoot'
import './App.css';

function App() {
    const [mainNode, setMainNode] = useState({id: 'ROOT', name: 'Root:', children: []})
    const [choice, setChoice] = useState({do: '', node: ''})
    const [input, setInput] = useState('')
    const [click, setClick] = useState(0)

    function Node(id, name, children) {
        this.id = id
        this.name = name
        this.children = children || []
    }

    function clickNode(id, name) {
        setClick(id)
        setChoice({...choice, node: name})
    }

    function addNode(arr, id) {
        arr.forEach((it) => {
            if (it.id === id) {
                it.children.push(new Node(Math.floor(Math.random() * 10000), input))
            }
            addNode(it.children, id)
        })
    }

    function removeNode(arr, id) {
        arr.forEach((it, index) => {
            if (it.id === id) {
                arr.splice(index, 1)
            }
            removeNode(it.children, id)
        })
    }

    function editNode(arr, id) {
        arr.forEach((it) => {
            if (it.id === id) {
                it.name = input
            }
            editNode(it.children, id)
        })
    }

    function clickUser() {
        switch (choice.do) {
            case 'ADD':
                if (click === 'ROOT') {
                    setMainNode({...mainNode, children: [...mainNode.children, new Node(Math.floor(Math.random() * 10000), input)]})
                } else {
                    addNode(mainNode.children, click)
                    setMainNode(mainNode)
                }
                setChoice({do: '', node: ''})
                setInput('')
                break
            case 'REMOVE':
                removeNode(mainNode.children, click)
                setMainNode(mainNode)
                setChoice({do: '', node: ''})
                break
            case 'EDIT':
                editNode(mainNode.children, click)
                setMainNode(mainNode)
                setChoice({do: '', node: ''})
                setInput('')
                break
            case "RESET":
                setMainNode({id: 'ROOT', name: 'Root:', children: []})
                setChoice({do: '', node: ''})
                break
            default:
                setMainNode(mainNode)
                break
        }
    }

    return (
        <div>
            <div className="App">
                <div className='main'>
                    <div className='main__block'>
                        <NodeRoot {...mainNode} clickNode={clickNode} />
                    </div>
                </div>

                <button
                    className='btn'
                    type='button'
                    onClick={(e) => setChoice({...choice, do: e.target.value})}
                    value='ADD'
                >
                    Add
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => setChoice({...choice, do: e.target.value})}
                    value='REMOVE'
                >
                    Remove
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => setChoice({...choice, do: e.target.value})}
                    value='EDIT'
                >
                    Edit
                </button>
                <button
                    className='btn'
                    type='button'
                    onClick={(e) => setChoice({do: e.target.value, node: 'Root:'})}
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
                        {(choice.do === 'REMOVE' || choice.do === 'RESET')
                        ?
                        null
                        :
                        <input onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter the node name' maxLength='10' />
                        }        
                        <button className='btn' type='button' onClick={clickUser}>Apply</button>
                    </div>
                    :
                    <p>Select the node and action</p>
                    }
                </div>
        </div>
    );
}

export default App;
