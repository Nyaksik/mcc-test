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
        return arr.children.map((it) => {
            if (it.id === id) {
                return {...it, children: [...it.children, new Node(Math.floor(Math.random() * 10000), input)]}
            }
            addNode(it, id)
            return it
        });
    }

    function removeNode(arr, id) {
        return arr.children.filter((it) => {
            if (it.id === id) {
                return
            }
            removeNode(it, id)
            return it
        })
    }

    function editNode(arr, id) {
        return arr.children.map((it) => {
            if (it.id === id) {
                return {...it, name: input}
            }
            editNode(it, id)
            return it
        })
    }

    const clickUser = () => {
        switch (choice.do) {
            case 'ADD':
                if (click === 'ROOT') {
                    setMainNode({...mainNode, children: [...mainNode.children, new Node(Math.floor(Math.random() * 10000), input)]})
                } else {
                    setMainNode({...mainNode, children: [...addNode(mainNode, click)]})
                }
                setInput('')
                break
            case 'REMOVE':
                setMainNode({...mainNode, children: [...removeNode(mainNode, click)]})
                break
            case 'EDIT':
                setMainNode({...mainNode, children: [...editNode(mainNode, click)]})
                break
            case "RESET":
                setMainNode({id: 'ROOT', name: 'Root:', children: []})
                setChoice({...choice, do: '', node: ''})
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
                    <div className='node-block main__node-block'>
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
                    onClick={(e) => setChoice({...choice, do: e.target.value})}
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
                    <p>Select a branch and action</p>
                    }
                </div>
        </div>
    );
}

export default App;
