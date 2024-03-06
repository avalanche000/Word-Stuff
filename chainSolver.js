function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createConnectionMap(objectPool, connectorFunc) {
    const connectionMap = new Map();

    objectPool.forEach(object => {
        const connections = [];

        objectPool.forEach(obj => {
            if (object === obj) return;
            if (connectorFunc(object, obj)) connections.push(obj);
        });

        connectionMap.set(object, connections);
    });

    return connectionMap;
}

function createReverseConnectionMap(objectPool, connectorFunc) {
    const connectionMap = new Map();

    objectPool.forEach(object => {
        const connections = [];

        objectPool.forEach(obj => {
            if (object === obj) return;
            if (connectorFunc(obj, object)) connections.push(obj);
        });

        connectionMap.set(object, connections);
    });

    return connectionMap;
}

function createTwoWayConnectionMap(objectPool, connectorFunc) {
    const connectionMap = new Map();
    const reverseConnectionMap = new Map();

    objectPool.forEach(object => {
        const connections = [];
        const reverseConnections = [];

        objectPool.forEach(obj => {
            if (object === obj) return;
            if (connectorFunc(object, obj)) connections.push(obj);
            if (connectorFunc(obj, object)) reverseConnections.push(obj);
        });

        connectionMap.set(object, connections);
        reverseConnectionMap.set(object, reverseConnections);
    });

    return [connectionMap, reverseConnectionMap];
}

function solveChain(objectPool, connectorFunc, startObject, endObject) {
    const [connectionMap, reverseConnectionMap] = createTwoWayConnectionMap(objectPool, connectorFunc);
    const usedObjects = [startObject];
    const depthMap = new Map();

    let checking = [startObject];
    let depth = 0;

    depthMap.set(startObject, 0);

    while (checking.length > 0) {
        const next = [];

        checking.forEach(object => {
            const connections = connectionMap.get(object);

            if (connections == null) return;

            connections.forEach(obj => {
                if (usedObjects.includes(obj)) return;
                if (next.includes(obj)) return;

                next.push(obj);
                usedObjects.push(obj);
                depthMap.set(obj, depth + 1);
            });
        });

        checking = next;
        depth++;
    }

    function getDepth(depth) {
        return objectPool.filter(object => depthMap.get(object) === depth);
    }

    function getReverseDepthConnections(object, depth) {
        const depthObjects = getDepth(depth);
        return reverseConnectionMap.get(object).filter(obj => depthObjects.includes(obj));
    }

    const chain = [endObject];
    let reverseObject = endObject;

    depth = depthMap.get(endObject);
    if (depth == null) return [];

    while (depth > 0) {
        depth--;

        reverseObject = randomChoice(getReverseDepthConnections(reverseObject, depth));
        chain.push(reverseObject);
    }

    return chain.reverse();
}

export { solveChain };
