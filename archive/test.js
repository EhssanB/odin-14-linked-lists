function linkedList() {
    let head = null;
    let tail = null;
    let current = null;
    let size = 0;

    function getHead() {
        return head;
    }

    function getTail() {
        return tail;
    }

    function incrementSizeByOne() {
        size++;
    }

    function getSize() {
        return size;
    }

    function prepend(value) {
        const newNode = node(value);
        incrementSizeByOne();
        if (head === null) {
            head = newNode;
            tail = newNode;
            return;
        } else if (getSize() === 1) {
            tail = head;
        }
        newNode.next = head;
        head = newNode;
        return;
    }

    function append(value) {
        const newNode = node(value);
        incrementSizeByOne();
        if (head === null) {
            head = newNode;
            tail = newNode;
            return;
        }
        current = head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
        tail = newNode;
        return;
    }

    function pop() {
        const listLength = getSize();
        if (listLength === 0) {
            return "The list is empty, you can't pop any elements";
        } else if (listLength === 1) {
            head = null;
            size--;
            return;
        }
        const secondToLastNode = at(listLength - 2);
        secondToLastNode.next = null;
        size--;
    }

    function at(index) {
        if (index > getSize() - 1) {
            return new Error("The index provided is out of range");
        }
        let pointer = 0;
        let currentNode = head;

        while (pointer != index) {
            currentNode = currentNode.next;
            pointer++;
        }

        return currentNode;
    }

    function contains(value) {
        let currentNode = head;

        while (true) {
            if (currentNode === null) {
                break;
            } else if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    function containsRecursive(value, head) {
        if (head === null) {
            return false;
        } else if (head.value === value) {
            return true;
        }

        return containsRecursive(value, head.next);
    }

    function find(value) {
        let currentIndex = 0;
        let currentNode = head;
        while (true) {
            if (currentNode === null) {
                return currentNode;
            } else if (currentNode.value === value) {
                return currentIndex;
            }
            currentNode = currentNode.next;
            currentIndex++;
        }
    }

    function insertAt(value, index) {
        const newNode = node(value);

        const previousNode = at(index - 1);
        const previousNextReference = previousNode.next;
        previousNode.next = newNode;

        newNode.next = previousNextReference;
        incrementSizeByOne();
    }

    function removeAt(index) {
        if (index === 0) {
            head = head.next;
            size--;
            return;
        }

        const previousNode = at(index - 1);
        const nodeToBeDeleted = at(index);
        const nextReferenceOfDeletedNode = nodeToBeDeleted.next;
        previousNode.next = nextReferenceOfDeletedNode;

        size--;
    }

    function toString() {
        let pointer = head;
        let sequence = "";
        if (pointer === null) {
            console.log(pointer);
            return;
        }
        while (pointer !== null) {
            sequence += `${pointer.value} -> `;
            pointer = pointer.next;
        }
        sequence += "null";
        console.log(sequence);
    }
    return {
        getHead,
        getTail,
        at,
        contains,
        containsRecursive,
        prepend,
        append,
        pop,
        find,
        insertAt,
        removeAt,
        getSize,
        toString,
    };
}

function node(value) {
    let next = null;
    return {
        value,
        next,
    };
}

function HashMap() {
    const LoadFactor = 0.75;
    let capacity = 16;
    let buckets = new Array(capacity);
    let numOfBuckets = 0;
    let numOfKeys = 0;

    function getCapacity() {
        return capacity;
    }

    function incrementNumOfBucketsByOne() {
        numOfBuckets++;
    }

    function incrementNumOfKeysByOne() {
        numOfKeys++;
    }

    function getNumOfBuckets() {
        return numOfBuckets;
    }

    function length() {
        return numOfKeys;
    }

    function getHashTable() {
        return buckets;
    }

    function updateCapacity(length) {
        capacity = length;
    }

    function has(key) {
        const bucketIndexOfKey = hash(key);
        const bucket = buckets[bucketIndexOfKey];

        if (bucket === undefined) {
            return false;
        }

        let currentNode = bucket.getHead();
        while (currentNode !== null) {
            if (key in currentNode.value) {
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    function get(key) {
        const bucketIndexOfKey = hash(key);
        const bucket = buckets[bucketIndexOfKey];

        if (bucket === undefined) {
            return null;
        }

        let currentNode = bucket.getHead();
        while (currentNode !== null) {
            if (key in currentNode.value) {
                return currentNode.value[key];
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    function set(key, value) {
        const keyValuePair = { [key]: value };
        const bucketIndex = hash(key);
        console.log(bucketIndex);

        if (buckets[bucketIndex] === undefined) {
            buckets[bucketIndex] = linkedList();
            buckets[bucketIndex].append(keyValuePair);
            incrementNumOfBucketsByOne();
            incrementNumOfKeysByOne();
            increaseHashTable();
            return;
        } else if (modifyValueIfKeyPresent(key, value, buckets[bucketIndex])) {
            return;
        }
        if (buckets[bucketIndex].getSize() === 0) {
            numOfBuckets++;
        }
        buckets[bucketIndex].append(keyValuePair);
        incrementNumOfKeysByOne();
        increaseHashTable();
    }

    function modifyValueIfKeyPresent(key, value, bucket) {
        let currentNode = bucket.getHead();

        while (currentNode !== null) {
            if (currentNode.value[key]) {
                currentNode.value[key] = value;
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    function increaseHashTable() {
        if (!shouldWeIncreaseSizeOfHashTable()) {
            return;
        }

        updateCapacity(capacity * 2);
        const newHashTable = new Array(capacity);

        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const headOfBucket = bucket.getHead();
            const headBucketKey = Object.keys(headOfBucket.value)[0];
            const newIndex = hash(headBucketKey);
            newHashTable[newIndex] = bucket;
        }
        buckets = newHashTable;
    }

    function shouldWeIncreaseSizeOfHashTable() {
        const currentLoadLevel = numOfBuckets / capacity;
        return currentLoadLevel >= LoadFactor ? true : false;
    }

    function remove(key) {
        if (!has(key)) {
            return false;
        }

        const bucketIndex = hash(key);
        const bucket = buckets[bucketIndex];
        let currentNode = bucket.getHead();
        let currentIndex = 0;

        while (currentNode !== null) {
            if (key in currentNode.value) {
                bucket.removeAt(currentIndex);
                numOfKeys--;
                if (bucket.getSize() === 0) {
                    numOfBuckets--;
                }
                return true;
            }
            currentIndex++;
        }
    }

    function clear() {
        capacity = 16;
        numOfBuckets = 0;
        numOfKeys = 0;
        const restoredArray = new Array(capacity);
        buckets = restoredArray;
    }

    function keys() {
        let arrayOfKeys = [];
        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const head = bucket.getHead();
            let currentNode = head;
            while (currentNode !== null) {
                const key = Object.keys(currentNode.value)[0];
                arrayOfKeys.push(key);
                currentNode = currentNode.next;
            }
        }

        return arrayOfKeys;
    }

    function values() {
        let arrayOfValues = [];
        for (let bucket of buckets) {
            if (!bucket) {
                continue;
            }
            const head = bucket.getHead();
            let currentNode = head;
            while (currentNode !== null) {
                const object = currentNode.value;
                const key = Object.keys(object)[0];
                const value = object[key];
                arrayOfValues.push(value);
                currentNode = currentNode.next;
            }
        }

        return arrayOfValues;
    }

    function entries() {
        const arrayOfKeys = keys();
        const arrayOfValues = values();
        const arrayOfKeyValuePairs = [];

        for (let i = 0; i < arrayOfKeys.length; i++) {
            const keyValuePairArray = [];
            keyValuePairArray.push(arrayOfKeys[i]);
            keyValuePairArray.push(arrayOfValues[i]);
            arrayOfKeyValuePairs.push(keyValuePairArray);
        }

        return arrayOfKeyValuePairs;
    }

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % capacity;
        }

        return hashCode;
    }

    return {
        getHashTable,
        getCapacity,
        length,
        getNumOfBuckets,
        has,
        get,
        set,
        remove,
        clear,
        keys,
        values,
        entries,
        buckets
    };
}
