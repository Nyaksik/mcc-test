import React from 'react'

function NodeRoot({ id, name, children, clickNode }) {
    return (
        <div>
            <div className='root' onClick={() => clickNode(id, name)}>{name}</div>
            <div className='node' tabIndex='0'>
                {(children || []).map((it) => <NodeRoot {...it} clickNode={clickNode} />)}
            </div>
        </div>
    )
}

export default NodeRoot
